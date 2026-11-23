# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Monorepo layout

pnpm workspace (pnpm 10, pinned via `packageManager` in the root `package.json`; no Turborepo):

- `apps/personal-site/`: the Next.js site. **Paths like `src/...` below are relative to this folder.**
- `apps/monitor-site/`: reserved for a future monitoring app (not created yet).
- `packages/ui/` (`@repo/ui`): shared components (`src/components/`), icons (`src/icons/`), types (`src/types/`) and the Tailwind v4 theme (`src/theme.css`). Exposed through an `exports` map: import as `@repo/ui/components/RepoPanel`, `@repo/ui/types/forms`, `@repo/ui/theme.css`. It ships TypeScript source; the site compiles it via `transpilePackages`, and the site's `src/app/globals.css` has an `@source` line so Tailwind scans it.
- **Apps never import from each other**, only from `packages/`. Each app's `eslint.config.mjs` lists the other apps in `otherApps` (`no-restricted-imports`); `packages/ui`'s ESLint config bans app imports and app path aliases. Inside `packages/ui`, import other files relatively.
- Only generic components belong in `packages/ui`. Anything using site data, the database, server actions or NextAuth stays in the app.
- Docs for humans: `docs/site-guide.md` (repo layout, everyday commands, content how-tos), `docs/monorepo-migration.md` (migration report), and `docs/wiki/` (source of the GitHub wiki, published by `.github/workflows/wiki.yml`). VS Code: `olivernorrie.code-workspace`.
- **Whenever you change the docs, update the wiki too** (and vice versa) in the same change: edit the matching page in `docs/wiki/`, and add new pages to `_Sidebar.md` (and `Home.md` for common tasks). Wiki pages are terse, command-first quick references for the owner, not explanations from scratch. Never edit the wiki on GitHub directly.

## Commands

Run from the repo root:

```bash
pnpm install
pnpm dev:site          # Next.js dev server (localhost:3000)
pnpm build:site        # Production build (output: "standalone")
pnpm start:site
pnpm lint              # ESLint in every app and package
pnpm typecheck         # tsc --noEmit in every app and package
pnpm db:generate       # Drizzle migration from apps/personal-site/src/db/schema.ts
pnpm db:migrate        # Apply migrations in apps/personal-site/drizzle/migrations
pnpm --filter personal-site add <pkg>   # add a dependency to one app (never the root)
docker compose -f apps/personal-site/compose.yaml up -d postgres   # local PostgreSQL
docker build -f apps/personal-site/Dockerfile .                    # image (from the repo root)
```

`pnpm --filter personal-site exec tsx drizzle/seed.ts` wipes and reseeds the resource tables: destructive, never against production.

There is no test suite. Verify changes with `pnpm lint`, `pnpm typecheck` and `pnpm build:site`.

Required env vars (in `apps/personal-site/.env.local`): `DATABASE_URL`, `AUTH_PASSWORD`, plus NextAuth's `AUTH_SECRET`. `AUTH_DEBUG=true` enables auth decision logging in production (always on in dev).

## Stack notes

- Next.js 16 (App Router), React 19, Tailwind CSS v4, TypeScript strict. See AGENTS.md — check `apps/personal-site/node_modules/next/dist/docs/` before using Next APIs.
- Next 16 renamed middleware to **proxy**: request interception lives in `src/proxy.ts` (exported `proxy`), not `middleware.ts`.
- Drizzle ORM 1.0 RC with `postgres-js`; NextAuth v5 beta.
- Site path aliases (tsconfig, app-only): `@/*` → `src/*`, `@c/*` → `src/components/*`, `@d/*` → `src/db/*`, `@l/*` → `src/lib/*`, `@p/*` → `public/*`.

## Architecture

### Auth and access control

- Single-user credentials login: `src/auth.ts` compares the submitted password to `AUTH_PASSWORD` and issues a JWT with `role: "admin"`. Roles are `AppRole = "admin" | "media"` (`src/types/auth.ts`); the role is copied onto the session via JWT/session callbacks (types augmented in `src/types/next-auth.d.ts`).
- Login brute-force lockout: `src/lib/auth/login-limiter.ts` (in-memory, per IP from `CF-Connecting-IP`): 5 failures in 15 min locks the IP out for 15 min. It is enforced inside `authorize` (not the login action) so direct POSTs to `/api/auth/callback/credentials` are covered too; a locked IP gets `LoginRateLimited` (`code = "rate_limited"`), which `src/app/login/actions.ts` turns into a "try again in N min" message. Request-volume rate limiting is done in Cloudflare, not the app.
- **Routes are private by default.** `src/lib/auth/access.ts` holds `ACCESS_RULES`; any path not matched by a rule requires `admin`. The longest matching rule wins. When adding a public page (or a public file route like `sitemap.xml`), add it to `ACCESS_RULES`, otherwise the proxy redirects to `/login`.
- `src/proxy.ts` enforces those rules on every non-static request. Server actions must additionally call `requirePathAccess(path)` from `src/lib/auth/server.ts` (see `src/app/actions/a-resource.ts`).

### Data layer (layered by file prefix)

`src/app/actions/a-*.ts` (server actions: validate FormData, check access) → `src/lib/service/s-*.ts` (business logic, shaping data into types from `src/types/`) → `src/lib/repo/r-*.ts` (raw Drizzle queries) → `src/db/`.

- `getDb()` in `src/db/db.ts` lazily creates the client (`server-only`). Wrap every query in `executeDatabaseQuery(...)`, which converts connection failures into `DatabaseConnectionError` with a known `digest`.
- `src/app/error.tsx` detects that digest via `isDatabaseConnectionError` and shows a "Database unavailable" screen instead of the generic error. Keep `src/db/errors.ts` client-safe (it is imported by the client error boundary).
- Schema (`src/db/schema.ts`): resource library hierarchy Category → optional SubCategory → Topic → Resource (+ ResourceType, ResourceNotes). Topics may belong directly to a category (`subCategoryId` null).
- DB-backed pages set `export const dynamic = "force-dynamic"`. Example flow: `src/app/career/resources/[[...slug]]/page.tsx` builds navigation + context server-side and passes it to a client component (`ResourcePageClient.tsx`).

### UI

- Shared primitives are in `packages/ui` (see Monorepo layout). In the site: `src/components/ui/` site-only primitives (`ScrambleText`, `SocialButton`), `src/components/sections/<area>/` feature components, `src/components/layout/` page shells, `src/components/icons/` SVG icon components.
- `docs/site-guide.md` is the owner's how-to for content changes (log entries, new project pages, pinning). Keep it in sync when changing anything it describes.

### Public site (home, /projects, /projects/<slug>)

- Visual identity: the original blue palette and translucent panels from `packages/ui/src/theme.css`, Helvetica, with a light "GitHub repo" layer on top: mono labels, `README.md` / `<id>.md` style panel header strips, tag dots, commit-style log. Avoid generic portfolio/AI-looking patterns. Never show the GitHub handle as visible text (breadcrumbs start at `home`).
- Nav: every public page has the same bar. `PathNav` (`@repo/ui/components/PathNav`) shows the path (`home / projects / homelab`, last segment bold, parents linked) with an optional right-hand slot. `NavBar` (home page) is a `PathNav` with just `home` plus links that scroll to sections (`targetId`) or go to a page (`href`).
- Home (`src/app/page.tsx`) uses `PortfolioLayout` (profile sidebar + `NavBar`): README panel, pinned projects (`featured` in config), and the log. Log entries are the `log` array in that file (newest first); each renders a `sections/home/LogEntry.tsx`.
- `RepoPanel` (`@repo/ui/components/RepoPanel`) is the panel with a header strip used on home and `/projects`.
- Pages with the profile sidebar use `PortfolioLayout` (home, `/projects`, login). Pages without it use `layout/PageLayout.tsx` (background + sticky `PathNav` + content). Private pages (dashboard, career) use the full screen width; project pages (via `ProjectPageLayout`) pass `contained` for a centred `max-w-7xl` column.
- The private dashboard and career pages are temporary: grids of `sections/workspace/WorkspaceCard.tsx` (name, description, and a `planned` badge only for tools that aren't built; dashboard cards have none). They'll be redesigned once the tools exist. The resources page (`career/resources`) is in the new style: `PageLayout` with the path in the nav and the topic name on the right of the bar, then the topic list (`ResourceNav`), summary and resource list as `RepoPanel`s. Categories, subcategories, topics and resources are created from `+` buttons and edited from pencil buttons (`EditButton`), each opening a modal form (`Create*Form.tsx` / `Edit*Form.tsx`; edit forms end with `@repo/ui/components/DeleteButton`, a confirm-then-delete form). The service layer owns the rules: slugs are built on create and never changed on rename, names must be unique within their parent, and only empty categories / subcategories / topics can be deleted. Rule violations throw `ResourceConflictError`, whose message the action returns to the form. Media, finance, notes and the other career sub-pages still use the old design.

### Projects

- `src/config/projects.ts` is the single source of truth (`slug`, `title`, `summary`, `tags`, `year`, `featured`). It drives the `/projects` list, the home page pinned cards, `sitemap.ts`, and each project page's nav path, tags and metadata. `getProject(slug)` throws on an unknown slug.
- Each project has a hand-written page at `src/app/projects/<slug>/page.tsx` built from `ProjectPageLayout` (shell: sticky `PathNav`, header, contents nav) plus the building blocks in `src/components/sections/projects/`: `ProjectHeader`, `ProjectSection` (styles plain `<p>`/`<strong>`/`<a>` children), `ProjectDetails`, `ProjectList`, `ProjectImage`. Each `ProjectSection` id must match an entry in the page's `sections` array. On mobile the contents list is `ProjectContentsMenu`, inside the nav bar.
- Tag dots are `TagDots` (`packages/ui/src/components/TagDots.tsx`); colours live in its `tagColours`. Tags are the tech stack; don't repeat the stack elsewhere on a page.

### Forms

- Server actions used by forms return `FormState` (`packages/ui/src/types/forms.ts`, imported as `@repo/ui/types/forms`): `{ status: "error", message }`, `{ status: "success" }` or `null`.
- `Form` (`packages/ui/src/components/Form.tsx`) takes the server action directly and handles `useActionState`, the pending text, the error message and the submit button; `onSuccess` runs after a success. Fields are `<Field label="...">` (a label wrapper) around an `<Input>` or `<Select>` (a custom dropdown so the option list can be styled; takes an `options` array of `{ value, label }` and submits under `name`). See `CreateResourceForm.tsx` and `LoginForm.tsx`.

### Animation

- `src/components/ui/ScrambleText.tsx` (site-only) is the "decrypt" text reveal; only use it on monospace text (proportional glyphs jitter).
- `packages/ui/src/theme.css` has `fade-up` (on load), and `reveal-on-scroll` / `draw-on-scroll` (CSS scroll-driven, no JS; browsers without `animation-timeline` just show the content). All are disabled under `prefers-reduced-motion`.

### Commits and attribution

- The owner makes all commits. Don't commit or push; stop at review points and suggest a commit message.
- **Never add Claude as a contributor** to any of the owner's repos (including the wiki): no `Co-Authored-By` trailers, no Claude git author, no "Generated with" lines. CI commits (the wiki workflow) are made as `github.actor`.

### Code style

- Follow the existing component style: default-export function components, props type above, Tailwind classes in multi-line template strings, `twMerge` for overridable `className`. Keep abstraction light: a component only for patterns that actually repeat.
- Formatting is Prettier defaults (the owner's VS Code extension). Only format files you changed.

## Deployment

- `.github/workflows/personal-site.yml` runs on pushes to `main` that touch `apps/personal-site/**`, `packages/**`, the lockfile, the workspace files or the workflow. It builds `apps/personal-site/Dockerfile` from the repo root and pushes `ghcr.io/grayhound85/personal-site:latest`. Day-to-day work happens on `dev`. A future app gets its own workflow file with its own path filters.
- The Dockerfile installs with pnpm (`--config.node-linker=hoisted`, a flat `node_modules`) and builds with `outputFileTracingRoot` at the repo root, so the standalone output mirrors the repo: the server runs from `/app/apps/personal-site`. The container runs `scripts/migrate.mjs` (applies `drizzle/migrations`) before `node server.js`, so committed migrations are applied automatically on deploy. Always generate a migration with `pnpm db:generate` after changing the schema.
- `migrate.mjs` runs outside Next, so the Dockerfile copies `postgres` and `drizzle-orm` into the image in full; any new runtime dependency of `migrate.mjs` must be copied there too.
- Install scripts only run for packages in `onlyBuiltDependencies` (`pnpm-workspace.yaml`); `sharp` is there because `next/image` needs it in production.
- `next.config.ts` sets `BUILD_COMMIT` / `BUILD_DATE` at build time for the home page footer. `.git` isn't in the Docker build context, so CI passes the commit as the `GIT_COMMIT` build arg; locally it falls back to `git rev-parse`.
