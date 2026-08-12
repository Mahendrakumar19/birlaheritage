# Birla Heritage School Platform

Next.js public website and admin panel backed by an Express API. The admin panel
manages announcements, gallery content, mandatory disclosures, admissions, and
contact enquiries.

## Local development

Requirements: Node.js 22+, npm, and PostgreSQL 17+ for production-parity
development.

```powershell
Copy-Item .env.example .env.local
Copy-Item backend\.env.example backend\.env

cd backend
npm ci
npm run db:migrate
npm run dev

# separate terminal
cd C:\base
npm ci
npm run dev
```

Frontend: `http://localhost:3000`

API: `http://localhost:5000`
Readiness: `http://localhost:5000/api/health/ready`

## Secure admin bootstrap

Admin signup is disabled by default. For a new installation only:

1. Set `ALLOW_ADMIN_SIGNUP=true` and a strong `BOOTSTRAP_ADMIN_TOKEN`.
2. Set `ALLOW_ADMIN_BOOTSTRAP_PAGE=true` for the frontend.
3. Create the first super administrator.
4. Immediately set both flags back to `false` and restart.

Never expose bootstrap mode on an existing production database.

## Architecture

```text
Next.js public/admin UI
  -> Express routes
  -> controllers
  -> domain services
  -> repositories/models
  -> PostgreSQL (production) / local adapter (development)
```

## Quality gates

```powershell
npm run lint
npm run typecheck
npm test
npm run build

cd backend
npm test
```

## Operations

- Back up before every migration: `npm run db:backup`
- Restore only with the API stopped:
  `node scripts/restore.js <backup-directory> --confirm`
- Rotate JWT, refresh, PII encryption, and bootstrap secrets through a secret
  manager; never commit `.env` files.
- See `backend/README.md` for API, migration, deployment, and rollback details.
