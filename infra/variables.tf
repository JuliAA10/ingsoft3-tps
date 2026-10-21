variable "image_repo_api" {
  type    = string
  default = "ghcr.io/juliaa10/timetracker-backend"
}

variable "image_repo_front" {
  type    = string
  default = "ghcr.io/juliaa10/timetracker-frontend"
}

variable "image_tag" {
  type    = string
  default = "sha-c3d4a9d27e0595295ddd39e608373082e612d603"
}

variable "region" {
  type    = string
  default = "oregon"
}

variable "front_service_name" {
  type    = string
  default = "timetracker-front-preprod"
}