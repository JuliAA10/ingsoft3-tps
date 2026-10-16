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

# ---- Etapa de tests ----
FROM build AS test

CMD ["npm", "run", "test:coverage"]

# ---- Etapa final: nginx ----
FROM nginx:alpine

COPY default.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html

ENV BACKEND_URL=http://backend:8080 \
    DNS_RESOLVER=127.0.0.11

EXPOSE 80