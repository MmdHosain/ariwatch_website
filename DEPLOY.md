# ARIWATCH Deployment Guide

ARIWATCH consists of three production components:
1. **PostgreSQL 16** — stores users, sessions, watches, variants, orders, blog posts, settings, and notification outbox.
2. **Backend API (`backend/`, port 4000)** — Express + TypeScript API, database auto-migrations, background workers, and `/app/uploads/catalog` persistent media volume.
3. **Frontend Storefront (`frontend/`, port 3000)** — Next.js 15 App Router bilingual storefront (Persian/English).

---

## Before You Deploy (Required Production Checklist)

1. Copy `.env.production.example` to `.env` and fill in real values:
   - Strong `POSTGRES_PASSWORD` (12+ random chars).
   - Public HTTPS `FRONTEND_ORIGIN` and `API_PUBLIC_URL`.
   - `ADMIN_MOBILES` set to real owner Iranian mobile number(s).
   - Live `ZARINPAL_MERCHANT_ID` with `ZARINPAL_SANDBOX=false`.
   - HTTPS `OTP_PROVIDER_URL` + `OTP_PROVIDER_TOKEN` (production never exposes mock OTPs).
   - `SEED_CATALOG=false` to prevent demo catalog seeding.
2. Verify local storefront assets exist:
   ```sh
   node scripts/download-resourses.cjs
   ```
3. Run the automated preflight check:
   ```sh
   node scripts/preflight-check.cjs .env
   ```

---

## Option 1: VPS with Docker Compose + Automatic HTTPS (Recommended)

Works on any Linux VPS (Hetzner, DigitalOcean, ArvanCloud, AbrArvan, Ubuntu/Debian) with Docker Engine + Docker Compose v2.

1. Point DNS A/AAAA records to your server IP:
   - `ariwatch.ir` -> `<SERVER_IP>`
   - `api.ariwatch.ir` -> `<SERVER_IP>`
2. Open firewall ports `80` and `443` (and `22` for SSH).
3. Clone the repo on the server and configure `.env`:
   ```sh
   cp .env.production.example .env
   nano .env
   ```
4. Run the one-command production deploy script (validates env, backs up DB if running, builds images, starts Caddy with automatic Let's Encrypt SSL, and waits for healthchecks):
   ```sh
   bash scripts/deploy.sh
   ```

### Using an Existing Nginx Server Instead of Caddy
If your VPS already runs Nginx + Certbot:
1. Deploy without Caddy:
   ```sh
   USE_CADDY=false bash scripts/deploy.sh
   ```
2. Copy `deploy/nginx.conf` into `/etc/nginx/sites-available/ariwatch.conf`, update your domain names, enable it, and run `sudo certbot --nginx -d ariwatch.ir -d api.ariwatch.ir`.

---

## Option 2: Render (Managed Cloud Blueprint)

1. Push this repository to GitHub/GitLab.
2. In the Render dashboard, choose **New -> Blueprint** and select the repo (`render.yaml` is detected automatically).
3. Fill in the prompted secret environment variables (`ADMIN_MOBILES`, `FRONTEND_ORIGIN`, `API_PUBLIC_URL`, `ZARINPAL_MERCHANT_ID`, `OTP_PROVIDER_URL`, `OTP_PROVIDER_TOKEN`, `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_SITE_URL`).
4. Render automatically provisions PostgreSQL, a persistent disk for `/app/uploads/catalog`, HTTPS certificates, and health checks (`/ready` and `/api/health`).

---

## Option 3: Fly.io

1. Create a managed Postgres database (`fly postgres create`) and note the `DATABASE_URL`.
2. Launch and configure the backend:
   ```sh
   fly launch --config deploy/fly.backend.toml --no-deploy
   fly volumes create catalog_media --size 5 --region fra
   fly secrets set \
     DATABASE_URL="postgres://..." \
     ADMIN_MOBILES="0912..." \
     FRONTEND_ORIGIN="https://ariwatch.ir" \
     API_PUBLIC_URL="https://api.ariwatch.ir" \
     ZARINPAL_MERCHANT_ID="..." \
     OTP_PROVIDER_URL="https://..." \
     OTP_PROVIDER_TOKEN="..."
   fly deploy --config deploy/fly.backend.toml
   ```
3. Launch and deploy the frontend:
   ```sh
   fly launch --config deploy/fly.frontend.toml --no-deploy
   fly deploy --config deploy/fly.frontend.toml \
     --build-arg NEXT_PUBLIC_API_URL=https://api.ariwatch.ir \
     --build-arg NEXT_PUBLIC_SITE_URL=https://ariwatch.ir
   ```

---

## Option 4: Vercel (Frontend) + Any Docker Host / Railway (Backend + DB)

1. Deploy `backend/` + PostgreSQL on Railway, Render, Fly.io, or a VPS.
   - If connecting to managed PostgreSQL with TLS, set `DATABASE_SSL=true`.
2. Import this repo into Vercel and set **Root Directory** to `frontend` (`frontend/vercel.json` is preconfigured).
3. Set Vercel environment variables:
   - `NEXT_PUBLIC_API_URL=https://api.ariwatch.ir`
   - `INTERNAL_API_URL=https://api.ariwatch.ir`
   - `NEXT_PUBLIC_SITE_URL=https://ariwatch.ir`

---

## Backups & Restore (Docker VPS)

Run manual or scheduled (cron) backups of both PostgreSQL and uploaded catalog media:

```sh
bash scripts/backup.sh
```

Example daily 03:00 UTC cron entry (`crontab -e`):
```cron
0 3 * * * cd /srv/ariwatch && bash scripts/backup.sh >> /var/log/ariwatch-backup.log 2>&1
```

Restore a PostgreSQL backup:
```sh
gunzip -c backups/db-YYYYMMDDTHHMMSSZ.sql.gz | docker compose -f docker-compose.yml -f docker-compose.production.yml exec -T db psql -U "$POSTGRES_USER" -d "$POSTGRES_DB"
```

---

## Health Check Endpoints

| Service | Endpoint | Purpose |
| --- | --- | --- |
| Backend (Liveness) | `GET /health` | Process is alive (`200 {"status":"OK"}`) |
| Backend (Readiness) | `GET /ready` | Process + PostgreSQL connection healthy (`200 {"status":"READY"}` or `503`) |
| Frontend | `GET /api/health` | Next.js server is responding (`200 {"status":"OK"}`) |
