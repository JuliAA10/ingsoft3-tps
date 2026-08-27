# ---- Etapa 1: build ----
FROM golang:1.22-alpine AS build

WORKDIR /app

# Copiamos primero los archivos de dependencias para aprovechar la caché
COPY go.mod go.sum ./
RUN go mod download

# Copiamos el código fuente
COPY . .

# Compilamos el backend para Linux
RUN CGO_ENABLED=0 GOOS=linux go build -o server ./cmd

# ---- Etapa 2: runtime ----
FROM alpine:3.20

WORKDIR /app

RUN apk --no-cache add ca-certificates

COPY --from=build /app/server .

EXPOSE 8080

CMD ["./server"]