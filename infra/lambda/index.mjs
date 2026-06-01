import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const ses = new SESClient({});
const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? "").split(",");

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
    return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: "Invalid JSON" }) };
  }

  const { name, email, message } = body;
  if (!name || !email || !message) {
    console.error("Missing fields:", { name: !!name, email: !!email, message: !!message });
    return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: "Missing fields" }) };
  }

  console.log(`Sending email from ${email} (${name})`);
  await ses.send(new SendEmailCommand({
    Source: process.env.CONTACT_EMAIL,
    Destination: { ToAddresses: [process.env.CONTACT_EMAIL] },
    Message: {
      Subject: { Data: `[LEXOFT] Contact from ${name}` },
      Body: {
        Text: { Data: `Name: ${name}\nEmail: ${email}\n\n${message}` },
      },
    },
  }));

  console.log("Email sent successfully");
  return { statusCode: 200, headers: corsHeaders, body: JSON.stringify({ ok: true }) };
};
