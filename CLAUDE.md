# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev            # Next.js dev server (localhost:3000)
npm run build          # Production build (output: "standalone")
npm run lint           # ESLint (flat config, eslint-config-next)
npm run db:generate    # Generate a Drizzle migration from src/db/schema.ts
npm run db:migrate     # Apply migrations in drizzle/migrations
npx tsx drizzle/seed.ts   # Wipe and reseed the resource tables (destructive)
docker compose up -d postgres   # Local PostgreSQL (reads POSTGRES_* env vars)
```

There is no test suite. Verify changes with `npm run lint` and `npm run build`.

Required env vars (in `.env.local` / `.env`): `DATABASE_URL`, `AUTH_PASSWORD`, plus NextAuth's `AUTH_SECRET`. `AUTH_DEBUG=true` enables auth decision logging in production (always on in dev).

## Stack notes

- Next.js 16 (App Router), React 19, Tailwind CSS v4, TypeScript strict. See AGENTS.md — check `node_modules/next/dist/docs/` before using Next APIs.
- Next 16 renamed middleware to **proxy**: request interception lives in `src/proxy.ts` (exported `proxy`), not `middleware.ts`.
- Drizzle ORM 1.0 RC with `postgres-js`; NextAuth v5 beta.
- Path aliases (tsconfig): `@/*` → `src/*`, `@c/*` → `src/components/*`, `@d/*` → `src/db/*`, `@l/*` → `src/lib/*`, `@p/*` → `public/*`.

## Architecture

### Auth and access control

- Single-user credentials login: `src/auth.ts` compares the submitted password to `AUTH_PASSWORD` and issues a JWT with `role: "admin"`. Roles are `AppRole = "admin" | "media"` (`src/types/auth.ts`); the role is copied onto the session via JWT/session callbacks (types augmented in `src/types/next-auth.d.ts`).
- **Routes are private by default.** `src/lib/auth/access.ts` holds `ACCESS_RULES`; any path not matched by a rule requires `admin`. The longest matching rule wins. When adding a public page (or a public file route like `sitemap.xml`), add it to `ACCESS_RULES`, otherwise the proxy redirects to `/login`.
- `src/proxy.ts` enforces those rules on every non-static request. Server actions must additionally call `requirePathAccess(path)` from `src/lib/auth/server.ts` (see `src/app/actions/a-resource.ts`).

### Data layer (layered by file prefix)

`src/app/actions/a-*.ts` (server actions: validate FormData, check access) → `src/lib/service/s-*.ts` (business logic, shaping data into types from `src/types/`) → `src/lib/repo/r-*.ts` (raw Drizzle queries) → `src/db/`.

- `getDb()` in `src/db/db.ts` lazily creates the client (`server-only`). Wrap every query in `executeDatabaseQuery(...)`, which converts connection failures into `DatabaseConnectionError` with a known `digest`.
- `src/app/error.tsx` detects that digest via `isDatabaseConnectionError` and shows a "Database unavailable" screen instead of the generic error. Keep `src/db/errors.ts` client-safe (it is imported by the client error boundary).
- Schema (`src/db/schema.ts`): resource library hierarchy Category → optional SubCategory → Topic → Resource (+ ResourceType, ResourceNotes). Topics may belong directly to a category (`subCategoryId` null).
- DB-backed pages set `export const dynamic = "force-dynamic"`. Example flow: `src/app/career/resources/[[...slug]]/page.tsx` builds navigation + context server-side and passes it to a client component (`ResourcePageClient.tsx`).

### UI

- `src/components/ui/` generic primitives, `src/components/sections/<area>/` feature components, `src/components/layout/` page shells, `src/components/icons/` SVG icon components.
- Portfolio project cards are driven by `src/config/projects.ts`; each project also has a hand-written page under `src/app/projects/<name>/`. New public project pages should also be added to `src/app/sitemap.ts`.

## Deployment

- Pushing to `main` triggers `.github/workflows/production.yml`, which builds the Docker image and pushes `ghcr.io/grayhound85/personal-site:latest`. Day-to-day work happens on `dev`.
- The container runs `scripts/migrate.mjs` (applies `drizzle/migrations`) before `node server.js`, so committed migrations are applied automatically on deploy. Always generate a migration with `npm run db:generate` after changing the schema.
- The Dockerfile manually copies `postgres` and `drizzle-orm` into the standalone image for the migration script; any new runtime dependency of `migrate.mjs` must be copied there too.
