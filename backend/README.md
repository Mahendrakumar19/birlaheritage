# Birla Heritage API

Express API for public school content, admissions/contact submissions, and the
authenticated admin panel.

## Commands

```powershell
npm ci
npm run db:migrate
npm run db:seed
npm run dev
npm test
npm run db:backup
```

Configuration is validated from `.env`; copy `.env.example` and replace every
secret. Production startup rejects missing or weak JWT and PII encryption keys.

## Data and migrations

- Production: PostgreSQL through `DATABASE_URL`.
- Local development: the configured local adapter.
- Versioned migrations live in `migrations/`.
- Run `npm run db:migrate` before starting a new release.
- Use the SQLite import command once when moving legacy `data/school.db` data.

Always take and verify a backup before migration. A valid backup includes the
database and `data/uploads`.

## Authentication

Admin authentication uses short-lived access and rotating refresh sessions in
HttpOnly cookies. Public self-registration is disabled. The one-time bootstrap
flow requires `ALLOW_ADMIN_SIGNUP=true` and `BOOTSTRAP_ADMIN_TOKEN`; disable
both immediately after creating the first super administrator.

Roles:

- `super_admin`: user/security administration and all permissions
- `content_editor`: announcements, gallery, disclosures
- `admissions_manager`: admissions and contact workflows
- `viewer`: read-only access

## Health

- `GET /api/health/live`: process liveness
- `GET /api/health/ready`: database readiness
- `GET /api/health`: compatibility readiness endpoint

Production health responses intentionally omit database paths and secrets.

## Release and rollback

1. Run CI and staging end-to-end tests.
2. Run `npm run db:backup`.
3. Apply migrations.
4. Deploy the API and verify `/api/health/ready`.
5. Deploy the frontend and run smoke tests.
6. If verification fails, stop writes, restore the backup, and deploy the
   previous application image.

Uploaded files should use object storage in multi-instance deployments. Local
filesystem volumes are suitable only for a single controlled deployment.
