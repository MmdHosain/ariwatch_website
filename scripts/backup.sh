#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

BACKUP_DIR="${BACKUP_DIR:-$ROOT_DIR/backups}"
RETENTION_DAYS="${RETENTION_DAYS:-14}"
TIMESTAMP="$(date -u +%Y%m%dT%H%M%SZ)"

mkdir -p "$BACKUP_DIR"

if [ -f .env ]; then
  set -a
  # shellcheck disable=SC1091
  source .env
  set +a
fi

PG_USER="${POSTGRES_USER:-luxe_user}"
PG_DB="${POSTGRES_DB:-luxe_watches}"

echo "Backing up PostgreSQL database ($PG_DB)..."
docker compose -f docker-compose.yml -f docker-compose.production.yml exec -T db \
  pg_dump -U "$PG_USER" -d "$PG_DB" --no-owner --no-acl | gzip > "$BACKUP_DIR/db-${TIMESTAMP}.sql.gz"

echo "Backing up catalog_media uploads..."
docker compose -f docker-compose.yml -f docker-compose.production.yml exec -T backend \
  tar -czf - -C /app/uploads catalog > "$BACKUP_DIR/media-${TIMESTAMP}.tar.gz"

echo "Pruning backups older than ${RETENTION_DAYS} days..."
find "$BACKUP_DIR" -type f \( -name 'db-*.sql.gz' -o -name 'media-*.tar.gz' \) -mtime "+${RETENTION_DAYS}" -delete

echo "Backup completed:"
ls -lh "$BACKUP_DIR/db-${TIMESTAMP}.sql.gz" "$BACKUP_DIR/media-${TIMESTAMP}.tar.gz"
