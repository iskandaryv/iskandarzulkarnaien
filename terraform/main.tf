terraform {
  required_version = ">= 1.0"
  required_providers {
    supabase = {
      source  = "supabase/supabase"
      version = "~> 1.0"
    }
  }
}

# Configure the Supabase Provider
provider "supabase" {
  access_token = var.supabase_access_token
}

# Variables
variable "supabase_access_token" {
  description = "Supabase access token"
  type        = string
  sensitive   = true
}

variable "organization_id" {
  description = "Supabase organization ID"
  type        = string
  default     = "sltbiryctwkdmudfcsgm"
}

variable "database_password" {
  description = "Database password"
  type        = string
  sensitive   = true
}

# Create Supabase project (if needed)
# Note: The project already exists, so this is for reference
# resource "supabase_project" "data_api" {
#   organization_id   = var.organization_id
#   name             = "iskandaryv's Project"
#   database_password = var.database_password
#   region           = "eu-central-1"
# }

# Output the project details
output "project_url" {
  value = "https://vgkrcvmiidgfovuefufv.supabase.co"
}

output "project_id" {
  value = "vgkrcvmiidgfovuefufv"
}
