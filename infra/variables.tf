variable "aws_region" {
  description = "AWS region to deploy resources into"
  type        = string
  default     = "eu-west-3"
}

variable "contact_email" {
  description = "Email address that receives contact form submissions (must be SES-verified)"
  type        = string
}

variable "allowed_origins" {
  description = "List of origins allowed by CORS (CloudFront domains + localhost for dev)."
  type        = list(string)
  default     = ["*"]
}

variable "turnstile_secret" {
  description = "Cloudflare Turnstile secret key, used by the Lambda to verify challenge tokens."
  type        = string
  sensitive   = true
}

variable "throttle_burst_limit" {
  description = "API Gateway burst limit (max concurrent requests) for the contact endpoint."
  type        = number
  default     = 5
}

variable "throttle_rate_limit" {
  description = "API Gateway steady-state request rate (requests/second) for the contact endpoint."
  type        = number
  default     = 2
}
