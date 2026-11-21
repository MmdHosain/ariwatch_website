# Production Deployment Readiness Plan

This document tracks the multi-step hardening and multi-platform deployment preparation for ARIWATCH.

## Step 1: Application Production Hardening - [COMPLETED]
- [x] Add managed PostgreSQL SSL support, pool tuning, and idle error handling in `backend/src/infrastructure/database/postgres.ts`.
- [x] Add API security headers middleware and `/ready` database readiness endpoint in `backend/src/presentation/app.ts`.
- [x] Harden server binding (`0.0.0.0`) and graceful shutdown with force-exit timeout in `backend/src/presentation/server.ts`.
- [x] Add `frontend/next.config.mjs` with standalone output toggle, compression, `poweredByHeader: false`, and HTTP security headers.
- [x] Add lightweight frontend healthcheck endpoint at `frontend/app/api/health/route.ts`.
- [x] Wrap `Header` and `TopProgressBar` in `<Suspense>` in `frontend/app/[lang]/layout.tsx` to prevent Next.js 15 `useSearchParams` build failures.
- [x] Fix dynamic Tailwind class (`md:grid-cols-${cards.length}`) in `frontend/components/home/BuyingPathsSection.tsx` so production CSS builds retain grid columns.

## Step 2: Containerization & Reverse Proxy (VPS / Docker) - [COMPLETED]
- [x] Upgrade `backend/Dockerfile` and `frontend/Dockerfile` to multi-stage, non-root Alpine builds with healthchecks and fixed `pnpm@10.17.0`.
- [x] Tighten `backend/.dockerignore` and `frontend/.dockerignore`.
- [x] Harden `docker-compose.yml` and `docker-compose.production.yml` (remove public DB port in production, add restart policies, log rotation, and frontend healthchecks).
- [x] Add automatic HTTPS reverse proxy overlay (`docker-compose.proxy.yml` + `deploy/Caddyfile`) and Nginx template (`deploy/nginx.conf`).
- [x] Create `.env.production.example` and update `.gitignore`.

## Step 3: Cloud PaaS Blueprints & CI/CD - [COMPLETED]
- [x] Add Render blueprint (`render.yaml`).
- [x] Add Fly.io configs (`deploy/fly.backend.toml`, `deploy/fly.frontend.toml`).
- [x] Add Vercel config (`frontend/vercel.json`).
- [x] Add GitHub Actions CI pipeline (`.github/workflows/ci.yml`).

## Step 4: Operational Scripts & Documentation - [COMPLETED]
- [x] Add `scripts/preflight-check.cjs` to validate production configuration before release.
- [x] Add `scripts/deploy.sh` and `scripts/backup.sh` for repeatable VPS deploys and PostgreSQL + media volume backups.
- [x] Add comprehensive multi-platform deployment guide in `DEPLOY.md`.
