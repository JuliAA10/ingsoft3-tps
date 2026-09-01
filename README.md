# Time Tracker — Ingeniería de Software 3

Aplicación full-stack para gestión de tiempo orientada a freelancers y trabajadores remotos. Permite administrar proyectos y tareas, registrar horas trabajadas, visualizar estadísticas y generar facturas.

Este repositorio es utilizado como aplicación del semestre para los Trabajos Prácticos de **Ingeniería de Software 3**.

## Funcionalidades

- Autenticación de usuarios mediante JWT.
- Gestión de proyectos.
- Gestión de tareas.
- Registro de tiempo por proyecto y tarea.
- Timer de inicio y finalización.
- Estadísticas diarias, semanales y mensuales.
- Tarifas por hora para cada proyecto.
- Generación de facturas en PDF.
- Interfaz responsive.

## Stack tecnológico

### Frontend

- React
- TypeScript
- Vite
- TailwindCSS
- React Query
- React Router
- Axios
- jsPDF

### Backend

- Go
- Gin
- GORM
- JWT
- bcrypt

### Base de datos

- PostgreSQL

### Infraestructura local

- Docker
- Docker Compose
- nginx

---

# Ejecución con Docker

## Requisitos

Para ejecutar el sistema completo solamente es necesario tener instalado:

- Git
- Docker Desktop / Docker Engine
- Docker Compose

No es necesario instalar localmente Go, Node.js ni PostgreSQL.

## 1. Clonar el repositorio

```bash
git clone https://github.com/JuliAA10/ingsoft3-tps.git
cd ingsoft3-tps
```

## 2. Crear el archivo de variables de entorno

El repositorio contiene un archivo `.env.example` con las variables necesarias para ejecutar la aplicación.

En Linux, macOS o Git Bash:

```bash
cp .env.example .env
```

En Windows CMD:

```cmd
copy .env.example .env
```

Luego se pueden modificar los valores de `.env` si se desea.

Ejemplo:

```env
DB_PASSWORD=postgres
JWT_SECRET=tp2-secret-local
```

El archivo `.env` contiene configuración sensible y **no se encuentra versionado en Git**. El archivo `.env.example` sí se versiona y sirve como plantilla.

## 3. Levantar el sistema completo

```bash
docker compose up -d --build
```

Docker Compose construye y levanta automáticamente:

- PostgreSQL.
- Backend desarrollado en Go.
- Frontend React servido mediante nginx.

Para verificar el estado de los servicios:

```bash
docker compose ps
```

La base de datos debería aparecer con estado `healthy` y los servicios `backend` y `frontend` en ejecución.

## 4. Acceder a la aplicación

Frontend:

```text
http://localhost:3000
```

Backend:

```text
http://localhost:8080
```

Las peticiones realizadas por el frontend a `/api` son redirigidas por nginx hacia el servicio `backend` dentro de la red creada por Docker Compose.

---

# Arquitectura de contenedores

El sistema se ejecuta mediante tres servicios:

```text
Navegador
    |
    | localhost:3000
    v
Frontend
React + nginx
    |
    | backend:8080
    v
Backend
Go + Gin
    |
    | db:5432
    v
PostgreSQL
    |
    v
Volumen db_data
```

Docker Compose crea una red interna donde los servicios pueden comunicarse utilizando sus nombres.

Por este motivo, el backend se conecta a PostgreSQL utilizando:

```text
host=db
```

en lugar de utilizar una dirección IP fija o `localhost`.

---

# Persistencia de datos

PostgreSQL utiliza un volumen nombrado:

```text
db_data
```

Los datos sobreviven aunque los contenedores sean eliminados.

Por ejemplo:

```bash
docker compose down
docker compose up -d
```

Los datos continúan disponibles porque el volumen no fue eliminado.

Para eliminar también los datos persistidos:

```bash
docker compose down -v
```

La opción `-v` elimina los volúmenes asociados al proyecto.

---

# Healthcheck y orden de arranque

El servicio PostgreSQL posee un `healthcheck`.

El backend utiliza:

```yaml
depends_on:
  db:
    condition: service_healthy
```

Esto evita que el backend intente conectarse inmediatamente después de crear el contenedor de PostgreSQL.

`depends_on` define el orden de arranque, mientras que el `healthcheck` permite verificar que PostgreSQL esté realmente listo para aceptar conexiones.

---

# Imágenes Docker

Los Dockerfiles del backend y frontend utilizan **multi-stage builds**.

## Backend

La primera etapa utiliza la imagen del SDK de Go para compilar la aplicación.

La segunda etapa contiene únicamente el binario compilado y una imagen Alpine mínima.

Esto permite reducir considerablemente el tamaño de la imagen final.

## Frontend

La primera etapa utiliza Node para instalar las dependencias y generar el build de producción mediante Vite.

La segunda etapa utiliza nginx para servir los archivos estáticos generados.

Node no forma parte de la imagen final.

---

# Imágenes publicadas

Las imágenes del proyecto están publicadas en GitHub Container Registry con versionado semántico:

```text
ghcr.io/juliaa10/timetracker-backend:v0.1.0
ghcr.io/juliaa10/timetracker-frontend:v0.1.0
```

Las dos imágenes son públicas.

La versión `v0.1.0` fue construida para arquitectura `linux/amd64`.

---

# Ejecutar utilizando las imágenes del Registry

Además del `docker-compose.yml` utilizado para construir las imágenes localmente, el proyecto contiene:

```text
docker-compose.registry.yml
```

Esta variante utiliza directamente las imágenes publicadas en GitHub Container Registry.

Para ejecutarla:

```bash
cp .env.example .env
docker compose -f docker-compose.registry.yml up -d
```

En Windows CMD:

```cmd
copy .env.example .env
docker compose -f docker-compose.registry.yml up -d
```

En este caso Docker no construye el frontend ni el backend a partir del código fuente, sino que descarga las imágenes `v0.1.0` publicadas.

Para verificar los servicios:

```bash
docker compose -f docker-compose.registry.yml ps
```

---

# Detener la aplicación

Sin eliminar los datos:

```bash
docker compose down
```

Eliminando también el volumen de PostgreSQL:

```bash
docker compose down -v
```

---

# Estructura del proyecto

```text
ingsoft3-tps/
│
├── backend/
│   ├── cmd/
│   ├── internal/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── go.mod
│   └── go.sum
│
├── client/
│   ├── src/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── nginx.conf
│   ├── package.json
│   └── package-lock.json
│
├── docker-compose.yml
├── docker-compose.registry.yml
├── .env.example
├── decisiones.md
├── evidencias.md
└── README.md
```

---

# API

Todas las rutas de la API utilizan el prefijo `/api`.

## Autenticación

```text
POST /api/auth/register
POST /api/auth/login
```

## Proyectos

```text
GET    /api/projects
POST   /api/projects
GET    /api/projects/:id
PUT    /api/projects/:id
DELETE /api/projects/:id
```

## Tareas

```text
GET    /api/tasks
POST   /api/tasks
GET    /api/tasks/:id
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

## Registros de tiempo

```text
GET    /api/time-entries
POST   /api/time-entries
GET    /api/time-entries/:id
PUT    /api/time-entries/:id
DELETE /api/time-entries/:id
```

## Analytics

```text
GET /api/analytics/daily
GET /api/analytics/weekly
GET /api/analytics/monthly
```

## Facturas

```text
POST /api/invoices/generate
```

---

# Capturas de la aplicación

Las imágenes de la interfaz se encuentran en la carpeta:

```text
images/
```

Incluyen ejemplos de:

- Gestión de proyectos.
- Gestión de tareas.
- Registro de tiempo.
- Dashboard.
- Analytics.
- Generación de facturas.

---

# Flujo de trabajo

Los cambios al repositorio se realizan utilizando ramas de corta duración y Pull Requests hacia `main`.

Convención utilizada:

```text
feature/<descripcion>
fix/<descripcion>
```

La rama `main` se encuentra protegida y no permite cambios directos.

---

# Licencia

El proyecto se distribuye bajo licencia MIT.

