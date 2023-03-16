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

variable "github_token" {
  description = "GitHub token"
  sensitive   = true
}

variable "github_owner" {
  description = "GitHub owner"
  default     = "Psychoanalytic-Electronic-Publishing"
}

variable "github_repository" {
  description = "GitHub repository"
  default     = "data-processing"
}
