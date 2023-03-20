variable "env" {
  description = "Environment name"
  default     = "production"
}

variable "aws_region" {
  description = "AWS region"
  default     = "us-east-1"
}

variable "stack_name" {
  description = "Root name for the stack"
  default     = "pep-data-processing"
}

variable "github_private_key" {
  description = "GitHub private key"
  sensitive   = true
}

variable "github_app_id" {
  description = "GitHub app ID"
}

variable "github_installation_id" {
  description = "GitHub installation ID"
}

variable "github_owner" {
  description = "GitHub owner"
}

variable "github_repository" {
  description = "GitHub repository"
}
