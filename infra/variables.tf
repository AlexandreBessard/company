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
