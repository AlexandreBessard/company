output "contact_api_url" {
  description = "POST endpoint — paste this into src/environments/environment.ts as contactApiUrl"
  value       = "${trim(aws_apigatewayv2_stage.default.invoke_url, "/")}/contact"
}
