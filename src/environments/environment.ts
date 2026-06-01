export const environment = {
  production: false,
  contactApiUrl: '/contact',  // proxied to API Gateway by ng serve via proxy.conf.json
  // Cloudflare Turnstile "always passes" test site key — safe for local dev only.
  // https://developers.cloudflare.com/turnstile/troubleshooting/testing/
  turnstileSiteKey: '1x00000000000000000000AA'
};
