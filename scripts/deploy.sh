#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

USE_CADDY="${USE_CADDY:-true}"
SKIP_BACKUP="${SKIP_BACKUP:-false}"

echo "==> 1/5 Checking .env file"
if [ ! -f .env ]; then
  echo "ERROR: .env not found. Copy .env.production.example to .env and fill in production secrets."
  exit 1
fi

echo "==> 2/5 Running production preflight checks"
node scripts/preflight-check.cjs .env

COMPOSE_FILES=(-f docker-compose.yml -f docker-compose.production.yml)
if [ "$USE_CADDY" = "true" ]; then
  COMPOSE_FILES+=(-f docker-compose.proxy.yml)
fi

if [ "$SKIP_BACKUP" != "true" ] && docker compose "${COMPOSE_FILES[@]}" ps --status running db 2>/dev/null | grep -q db; then
  echo "==> 3/5 Creating pre-deploy backup"
  bash scripts/backup.sh
else
  echo "==> 3/5 Skipping pre-deploy backup (database not yet running or SKIP_BACKUP=true)"
fi

echo "==> 4/5 Building and starting production stack"
docker compose "${COMPOSE_FILES[@]}" up --build -d --remove-orphans

echo "==> 5/5 Verifying service health"
for i in $(seq 1 30); do
  if docker compose "${COMPOSE_FILES[@]}" exec -T backend node -e "fetch('http://127.0.0.1:4000/ready').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))" >/dev/null 2>&1 \
    && docker compose "${COMPOSE_FILES[@]}" exec -T frontend node -e "fetch('http://127.0.0.1:3000/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))" >/dev/null 2>&1; then
    echo "Deployment succeeded! All services are healthy."
    docker compose "${COMPOSE_FILES[@]}" ps
    exit 0
  fi
  sleep 2
done

echo "ERROR: Services did not become healthy in time. Inspect logs:"
docker compose "${COMPOSE_FILES[@]}" logs --tail=50
exit 1
