terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# Verifies the email address in SES. AWS will send a confirmation email —
# you must click the link before SES can send from/to this address.
resource "aws_ses_email_identity" "contact" {
  email = var.contact_email
}
