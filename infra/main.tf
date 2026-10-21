terraform {
  required_version = ">= 1.5.0"

  required_providers {
    neon = {
      source  = "kislerdm/neon"
      version = "0.18.0"
    }

    render = {
      source  = "render-oss/render"
      version = "1.9.1"
    }
  }
}

provider "neon" {}

resource "neon_project" "preprod" {
  name   = "timetracker-preprod"
  org_id = "org-broad-smoke-51947911"

  history_retention_seconds = 21600
}

resource "neon_role" "preprod" {
  project_id = neon_project.preprod.id
  branch_id  = neon_project.preprod.default_branch_id
  name       = "app_preprod_owner"
}

resource "neon_database" "preprod" {
  project_id = neon_project.preprod.id
  branch_id  = neon_project.preprod.default_branch_id
  name       = "app_preprod"
  owner_name = neon_role.preprod.name

}

provider "render" {}

locals {
  database_url = format(
    "postgresql://%s:%s@%s/%s?sslmode=require",
    urlencode(neon_role.preprod.name),
    urlencode(neon_role.preprod.password),
    neon_project.preprod.database_host,
    urlencode(neon_database.preprod.name)
  )

  expected_front_origin = "https://${var.front_service_name}.onrender.com"
}

resource "render_web_service" "api" {
  name              = "timetracker-api-preprod"
  plan              = "free"
  region            = var.region
  health_check_path = "/health"

  runtime_source = {
    image = {
      image_url = var.image_repo_api
      tag       = var.image_tag
    }
  }

  env_vars = {
    DATABASE_URL = {
      value = local.database_url
    }

    JWT_SECRET = {
      generate_value = true
    }

    PORT = {
      value = "8080"
    }

    ALLOWED_ORIGINS = {
      value = local.expected_front_origin
    }
  }
}

resource "render_web_service" "front" {
  name   = var.front_service_name
  plan   = "free"
  region = var.region

  runtime_source = {
    image = {
      image_url = var.image_repo_front
      tag       = var.image_tag
    }
  }

  env_vars = {
    BACKEND_URL = {
      value = trimsuffix(render_web_service.api.url, "/")
    }

    DNS_RESOLVER = {
      value = "8.8.8.8"
    }
  }
}