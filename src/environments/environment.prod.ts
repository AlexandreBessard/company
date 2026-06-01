export const environment = {
  production: true,
  contactApiUrl: 'https://ib4bc92tl4.execute-api.eu-west-3.amazonaws.com/contact',
  // Cloudflare Turnstile *site* key (public). The matching *secret* key lives in
  // infra/terraform.tfvars as `turnstile_secret` — never put the secret here.
  turnstileSiteKey: '0x4AAAAAADc8tImu0k2Lcjtz'
};
