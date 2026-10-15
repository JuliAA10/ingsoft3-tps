#!/bin/sh
set -eu

REPORT_DIR=/out/backend
mkdir -p "$REPORT_DIR"

# Medición de todos los paquetes del backend.
go test ./... -count=1 -coverpkg=./... \
  -coverprofile="$REPORT_DIR/coverage-all.out"

go tool cover -func="$REPORT_DIR/coverage-all.out" \
  > "$REPORT_DIR/coverage-all.txt"

go tool cover -html="$REPORT_DIR/coverage-all.out" \
  -o "$REPORT_DIR/index.html"

# Medición específica de los servicios.
go test ./internal/services -count=1 \
  -coverprofile="$REPORT_DIR/coverage-services.out"

go tool cover -func="$REPORT_DIR/coverage-services.out" \
  > "$REPORT_DIR/coverage-services.txt"

go tool cover -html="$REPORT_DIR/coverage-services.out" \
  -o "$REPORT_DIR/services.html"

# Extraer los porcentajes totales.
TOTAL=$(awk '/^total:/ {gsub(/%/, "", $3); print $3}' \
  "$REPORT_DIR/coverage-all.txt")

SERVICES=$(awk '/^total:/ {gsub(/%/, "", $3); print $3}' \
  "$REPORT_DIR/coverage-services.txt")

# Un reporte vacío no debe producir un falso resultado exitoso.
if [ -z "$TOTAL" ] || [ -z "$SERVICES" ]; then
  echo "ERROR: no se pudieron obtener los porcentajes de cobertura."
  exit 1
fi

# Este archivo se podrá publicar en el resumen de GitHub Actions.
cat > "$REPORT_DIR/summary.md" <<EOF
## Cobertura del backend

| Alcance | Sentencias cubiertas | Umbral |
|---|---:|---:|
| Backend completo | ${TOTAL}% | 5% |
| Services | ${SERVICES}% | 90% |

La cobertura de ramas no está incluida en esta medición.
EOF

cat "$REPORT_DIR/summary.md"

# Verificar ambos umbrales y devolver un error si alguno no se cumple.
awk -v total="$TOTAL" -v services="$SERVICES" '
BEGIN {
  failed = 0

  if (total < 5) {
    printf "ERROR: cobertura global %.1f%% inferior al umbral 5%%\n", total
    failed = 1
  }

  if (services < 90) {
    printf "ERROR: cobertura de services %.1f%% inferior al umbral 90%%\n", services
    failed = 1
  }

  if (!failed) {
    print "OK: se cumplen los umbrales de cobertura del backend."
  }

  exit failed
}'