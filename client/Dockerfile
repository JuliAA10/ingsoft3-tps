# ---- Etapa 1: build ----
FROM node:22-alpine AS build

WORKDIR /app

# Dependencias primero para aprovechar la cache
COPY package*.json ./
RUN npm ci

# Código fuente
COPY . .

# La SPA llamará al backend usando /api
ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build


# ---- Etapa 2: nginx ----
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80