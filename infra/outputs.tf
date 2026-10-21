output "db_host" {
  description = "Host de PostgreSQL de preprod"
  value       = neon_project.preprod.database_host
}

output "database" {
  description = "Nombre de la base de preprod"
  value       = neon_database.preprod.name
}

output "api_url" {
  description = "URL de la API de preprod"
  value       = render_web_service.api.url
}

output "front_url" {
  description = "URL del frontend de preprod"
  value       = render_web_service.front.url
}