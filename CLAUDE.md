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
- `docs/site-guide.md` is the owner's how-to for content changes (log entries, new project pages, pinning). Keep it in sync when changing anything it describes.

### Public site (home, /projects, /projects/<slug>)

- Visual identity: the original blue palette and translucent panels from `globals.css`, Helvetica, with a light "GitHub repo" layer on top: mono labels, `README.md` / `<id>.md` style panel header strips, tag dots, commit-style log. Avoid generic portfolio/AI-looking patterns. Never show the GitHub handle as visible text (breadcrumbs start at `home`).
- Nav: every public page has the same bar. `PathNav` (`ui/PathNav.tsx`) shows the path (`home / projects / homelab`, last segment bold, parents linked) with an optional right-hand slot. `NavBar` (home page) is a `PathNav` with just `home` plus links that scroll to sections (`targetId`) or go to a page (`href`).
- Home (`src/app/page.tsx`) uses `PortfolioLayout` (profile sidebar + `NavBar`): README panel, pinned projects (`featured` in config), and the log. Log entries are the `log` array in that file (newest first); each renders a `sections/home/LogEntry.tsx`.
- `RepoPanel` (`ui/RepoPanel.tsx`) is the panel with a header strip used on home and `/projects`.
- Pages with the profile sidebar use `PortfolioLayout` (home, `/projects`, login). Pages without it use `layout/PageLayout.tsx` (background + sticky `PathNav` + content). Private pages (dashboard, career) use the full screen width; project pages (via `ProjectPageLayout`) pass `contained` for a centred `max-w-7xl` column.
- The private dashboard and career pages are temporary: grids of `sections/workspace/WorkspaceCard.tsx` (name, description, and a `planned` badge only for tools that aren't built; dashboard cards have none). They'll be redesigned once the tools exist. Media, finance, notes and the career sub-pages still use the old design.

### Projects

- `src/config/projects.ts` is the single source of truth (`slug`, `title`, `summary`, `tags`, `year`, `featured`). It drives the `/projects` list, the home page pinned cards, `sitemap.ts`, and each project page's nav path, tags and metadata. `getProject(slug)` throws on an unknown slug.
- Each project has a hand-written page at `src/app/projects/<slug>/page.tsx` built from `ProjectPageLayout` (shell: sticky `PathNav`, header, contents nav) plus the building blocks in `src/components/sections/projects/`: `ProjectHeader`, `ProjectSection` (styles plain `<p>`/`<strong>`/`<a>` children), `ProjectDetails`, `ProjectList`, `ProjectImage`. Each `ProjectSection` id must match an entry in the page's `sections` array. On mobile the contents list is `ProjectContentsMenu`, inside the nav bar.
- Tag dot colours live in `tagColours` in `ProjectTags.tsx`. Tags are the tech stack; don't repeat the stack elsewhere on a page.

### Animation

- `ui/ScrambleText.tsx` is the "decrypt" text reveal; only use it on monospace text (proportional glyphs jitter).
- `globals.css` has `fade-up` (on load), and `reveal-on-scroll` / `draw-on-scroll` (CSS scroll-driven, no JS; browsers without `animation-timeline` just show the content). All are disabled under `prefers-reduced-motion`.

### Code style

- Follow the existing component style: default-export function components, props type above, Tailwind classes in multi-line template strings, `twMerge` for overridable `className`. Keep abstraction light: a component only for patterns that actually repeat.
- Formatting is Prettier defaults (the owner's VS Code extension). Only format files you changed.

## Deployment

- Pushing to `main` triggers `.github/workflows/production.yml`, which builds the Docker image and pushes `ghcr.io/grayhound85/personal-site:latest`. Day-to-day work happens on `dev`.
- The container runs `scripts/migrate.mjs` (applies `drizzle/migrations`) before `node server.js`, so committed migrations are applied automatically on deploy. Always generate a migration with `npm run db:generate` after changing the schema.
- The Dockerfile manually copies `postgres` and `drizzle-orm` into the standalone image for the migration script; any new runtime dependency of `migrate.mjs` must be copied there too.
- `next.config.ts` sets `BUILD_COMMIT` / `BUILD_DATE` at build time for the home page footer. `.git` isn't in the Docker build context, so CI passes the commit as the `GIT_COMMIT` build arg; locally it falls back to `git rev-parse`.
