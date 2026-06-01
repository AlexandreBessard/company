import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const ses = new SESClient({});
const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? "").split(",");

const MIN_SUBMIT_MS = 2000;
const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 5000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const reject = (statusCode, headers, error) => ({
  statusCode,
  headers,
  body: JSON.stringify({ error }),
});

/** Validate the Turnstile token with Cloudflare. Returns true if human-verified. */
async function verifyTurnstile(token, ip) {
  const secret = process.env.TURNSTILE_SECRET;
  if (!secret) {
    // Misconfiguration: fail closed rather than letting spam through.
    console.error("TURNSTILE_SECRET is not set");
    return false;
  }
  if (!token) return false;
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.append("remoteip", ip);
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
    });
    const data = await res.json();
    if (!data.success) console.warn("Turnstile failed:", data["error-codes"]);
    return data.success === true;
  } catch (err) {
    console.error("Turnstile verify error:", err);
    return false;
  }
}

export const handler = async (event) => {
  const requestOrigin = event.headers?.origin ?? "";
  const allowedOrigin = allowedOrigins.includes(requestOrigin) ? requestOrigin : allowedOrigins[0];
  const corsHeaders = {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "Content-Type",
  };

  let body;
  try {
    body = JSON.parse(event.body ?? "{}");
  } catch {
    return reject(400, corsHeaders, "Invalid JSON");
  }

  const { name, email, message, company, turnstileToken, elapsedMs } = body;

  // 1) Honeypot — a real browser never fills this hidden field.
  if (company) {
    console.warn("Honeypot tripped");
    // Look successful so bots get no signal; nothing is sent.
    return { statusCode: 200, headers: corsHeaders, body: JSON.stringify({ ok: true }) };
  }

  // 2) Submitted implausibly fast → bot.
  if (typeof elapsedMs === "number" && elapsedMs < MIN_SUBMIT_MS) {
    console.warn("Submitted too fast:", elapsedMs);
    return reject(400, corsHeaders, "Spam detected");
  }

  // 3) Bot/abuse challenge.
  const ip = event.headers?.["x-forwarded-for"]?.split(",")[0]?.trim();
  if (!(await verifyTurnstile(turnstileToken, ip))) {
    return reject(403, corsHeaders, "Captcha verification failed");
  }

  // 4) Server-side validation (the frontend can be bypassed).
  if (!name || !email || !message) {
    return reject(400, corsHeaders, "Missing fields");
  }
  if (
    typeof name !== "string" || name.length > MAX_NAME ||
    typeof email !== "string" || email.length > MAX_EMAIL || !EMAIL_RE.test(email) ||
    typeof message !== "string" || message.length < 10 || message.length > MAX_MESSAGE
  ) {
    return reject(400, corsHeaders, "Invalid input");
  }

  // Strip newlines from the value that flows into the email subject (header hygiene).
  const safeName = name.replace(/[\r\n]+/g, " ").trim();

  console.log(`Sending email from ${email} (${safeName})`);
  await ses.send(new SendEmailCommand({
    Source: process.env.CONTACT_EMAIL,
    Destination: { ToAddresses: [process.env.CONTACT_EMAIL] },
    ReplyToAddresses: [email],
    Message: {
      Subject: { Data: `[LEXOFT] Contact from ${safeName}` },
      Body: {
        Text: { Data: `Name: ${safeName}\nEmail: ${email}\n\n${message}` },
      },
    },
  }));

  console.log("Email sent successfully");
  return { statusCode: 200, headers: corsHeaders, body: JSON.stringify({ ok: true }) };
};
