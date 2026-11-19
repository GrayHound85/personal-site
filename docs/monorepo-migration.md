# Monorepo migration report

November 2026. The repo went from a single Next.js app (npm) to a pnpm
workspace, so a separate monitoring app can be added later that shares UI
components with the site. The migration was structure only: the site's pages,
styling, animations, auth, database and migrations are unchanged.

| Phase | Commit                                                               |
| ----- | -------------------------------------------------------------------- |
| 1     | `Move the site into a pnpm workspace under apps/personal-site`       |
| 2     | `Add the shared @repo/ui package and move shared components into it` |
| 3     | `Build the site's Docker image from the monorepo root`               |
| 4     | `Update the docs for the monorepo and add a VS Code workspace`       |

---

## 1. Summary

- The site moved to `apps/personal-site`. `apps/monitor-site` is reserved for
  the monitoring app.
- Generic components and the Tailwind theme moved to `packages/ui`, used as
  `@repo/ui`.
- ESLint stops apps importing from each other. Shared code goes in
  `packages/`.
- Docker builds from the repo root. CI only runs when the site or shared code
  changes.
- No Turborepo or other extra tooling: plain pnpm workspaces.

## 2. Structure

```
olivernorrie/                      (folder on disk may still be "personal-site")
├── apps/
│   ├── personal-site/             src/, public/, drizzle/, scripts/, Dockerfile,
│   │                              compose.yaml, configs, .env.local
│   └── monitor-site/              reserved, empty
├── packages/
│   └── ui/                        package.json, tsconfig.json, eslint.config.mjs
│       └── src/
│           ├── theme.css
│           ├── components/        Button, Card, CopyButton, DeleteButton, Field,
│           │                      Form, Input, LinkButton, LinkCard, Modal,
│           │                      NavBar, PathNav, RepoPanel, Select, TagDots
│           ├── icons/             CopyIcon, TickIcon
│           └── types/             forms.ts
├── docs/                          site-guide.md, this report, wiki/
├── .github/workflows/             personal-site.yml, wiki.yml
├── package.json                   root: scripts only
├── pnpm-workspace.yaml
├── pnpm-lock.yaml
├── .dockerignore
└── olivernorrie.code-workspace
```

## 3. What moved where

All tracked files were moved with `git mv`, so `git log --follow` still shows
their history.

### Site and config files

| Old path                                                                         | New path                                            |
| -------------------------------------------------------------------------------- | --------------------------------------------------- |
| `src/`, `public/`, `drizzle/`, `scripts/`                                        | `apps/personal-site/` (same layout inside)          |
| `package.json` (named `web`)                                                     | `apps/personal-site/package.json` (`personal-site`) |
| `Dockerfile`, `compose.yaml`, `next.config.ts`, `next-env.d.ts`, `tsconfig.json` | `apps/personal-site/`                               |
| `drizzle.config.ts`, `eslint.config.mjs`, `postcss.config.mjs`, `auth.config.ts` | `apps/personal-site/`                               |
| `.env.local` (untracked, plain `mv`)                                             | `apps/personal-site/.env.local`                     |
| `package-lock.json`                                                              | removed (converted to `pnpm-lock.yaml`)             |
| `.github/workflows/production.yml`                                               | `.github/workflows/personal-site.yml`               |

### Components into `packages/ui`

| Old path (in `apps/personal-site/src/`)                          | New path (in `packages/ui/src/`)   |
| ---------------------------------------------------------------- | ---------------------------------- |
| `app/globals.css` (all but `@import "tailwindcss"`)              | `theme.css`                        |
| `components/ui/RepoPanel.tsx`, `Card.tsx`, `LinkCard.tsx`        | `components/`                      |
| `components/ui/PathNav.tsx`, `NavBar.tsx`, `Modal.tsx`           | `components/`                      |
| `components/ui/Button.tsx`, `LinkButton.tsx`, `CopyButton.tsx`   | `components/`                      |
| `components/icons/CopyIcon.tsx`, `TickIcon.tsx`                  | `icons/`                           |
| `components/sections/projects/ProjectTags.tsx`                   | `components/TagDots.tsx` (renamed) |
| `components/ui/Form.tsx`, `Field.tsx`, `Input.tsx`, `Select.tsx` | `components/`                      |
| `components/ui/DeleteButton.tsx`                                 | `components/`                      |
| `types/forms.ts`                                                 | `types/forms.ts`                   |

The site's `src/app/globals.css` was recreated as three lines that import the
shared theme.

### Deliberately left in the site

| What                                                                               | Why                                                  |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `ScrambleText`                                                                     | Owner's call, the monitoring app won't need it       |
| `SocialButton`, `ProfileCard`                                                      | Profile-specific                                     |
| Layouts (`BackgroundLayout`, `PortfolioLayout`, `PageLayout`, `ProjectPageLayout`) | Share when the monitoring app actually needs a shell |
| Project and resource components, `LogEntry`, `WorkspaceCard`                       | Use the site's data and types                        |
| Server actions, services, repo layer, database, NextAuth                           | Site-specific by definition                          |
| `DividerLine`, `ExpandibleText`                                                    | Unused, left where they were                         |
| Other icons                                                                        | Only used by site components                         |

## 4. Config changes, and why

| File                                                                       | Change                                                                                                                                  | Why                                                                                                               |
| -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `package.json` (root, new)                                                 | Scripts only (`dev:site`, `build:site`, `start:site`, `lint`, `typecheck`, `db:generate`, `db:migrate`); `packageManager: pnpm@10.34.9` | One place to run everything; everyone (and Docker) uses the same pnpm                                             |
| `pnpm-workspace.yaml` (new)                                                | `apps/*`, `packages/*`; `onlyBuiltDependencies`: `sharp`, `esbuild`, `unrs-resolver`                                                    | pnpm blocks install scripts by default; `sharp` is needed by `next/image` in production                           |
| `pnpm-lock.yaml` (new)                                                     | Made with `pnpm import` from the npm lockfile                                                                                           | Same 517 package versions, nothing upgraded silently                                                              |
| `apps/personal-site/package.json`                                          | Renamed to `personal-site`; `typecheck` script; `"@repo/ui": "workspace:*"`                                                             | Matches `--filter personal-site`; uses the shared package                                                         |
| `apps/personal-site/next.config.ts`                                        | `transpilePackages: ["@repo/ui"]`; `outputFileTracingRoot` = repo root                                                                  | The package is TypeScript source Next must compile; standalone output must include it                             |
| `apps/personal-site/src/app/globals.css`                                   | `@import "tailwindcss"`, `@import "@repo/ui/theme.css"`, `@source` pointing at `packages/ui/src`                                        | Tailwind only scans the app's folder by default                                                                   |
| `apps/personal-site/eslint.config.mjs`                                     | `no-restricted-imports` for the apps in `otherApps`                                                                                     | Enforces "apps never import each other"                                                                           |
| `packages/ui/package.json` (new)                                           | `exports` for `theme.css`, `components/*`, `icons/*`, `types/*`; `tailwind-merge` dependency; `next`/`react`/`react-dom` as peers       | Clear import paths; one copy of React and Next                                                                    |
| `packages/ui/tsconfig.json` (new)                                          | Same strict settings as the site                                                                                                        | `pnpm typecheck` covers the package                                                                               |
| `packages/ui/eslint.config.mjs` (new)                                      | Bans imports from apps and the site's `@/`, `@c/` aliases                                                                               | Keeps the package independent; aliases don't exist there                                                          |
| `apps/personal-site/Dockerfile`                                            | Build from repo root; corepack pnpm; `--config.node-linker=hoisted`; files placed next to `/app/apps/personal-site/server.js`           | The image needs `packages/ui`; hoisted layout keeps the `postgres` / `drizzle-orm` copy for `migrate.mjs` working |
| `.dockerignore`                                                            | `**/` patterns (`**/node_modules`, `**/.next`, `**/.env*`…)                                                                             | The build context is now the repo root                                                                            |
| `.github/workflows/personal-site.yml`                                      | `-f apps/personal-site/Dockerfile .`; path filters                                                                                      | Only build when the site, packages, lockfile, workspace files or the workflow change                              |
| `tsconfig.json`, `drizzle.config.ts`, `postcss.config.mjs`, `compose.yaml` | Unchanged                                                                                                                               | Their paths are relative and moved with what they point at                                                        |
| `AGENTS.md`, `CLAUDE.md`, `README.md`, `docs/site-guide.md`                | New paths, pnpm commands, monorepo rules                                                                                                | Keep the docs accurate                                                                                            |

## 5. Decisions

- **Folder names** `apps/personal-site` and `apps/monitor-site` (owner's
  choice, over `apps/site` / `apps/ops`).
- **pnpm 10.34.9, not 12.** The corepack bundled with Node 22 (locally and in
  `node:22-alpine`) can't run pnpm 12, which ships as a native binary. Moving
  up is a one-line `packageManager` change once Node ships a newer corepack.
- **Hoisted install in Docker only.** Development keeps pnpm's strict
  default, so a missing dependency fails straight away.
- **One workflow file per app** (option a). GitHub Actions can't skip
  individual jobs by path without a third-party action; separate files can.
- **`ProjectTags` renamed to `TagDots`**, as it's no longer project-specific.
- **Extra components moved** beyond the listed groups (`Button`,
  `LinkButton`, `CopyButton`, `NavBar`, `Modal`, `Card`, `LinkCard`): generic,
  and `Form` needs `Button`.
- **Docs stay at the root**: they cover the whole repo.
- **VS Code workspace has exactly the requested folders**; root files aren't
  in the sidebar (one-line change to add them, see the site guide).
- **Four moved files left unformatted** (`CopyButton`, `LinkCard`, `CopyIcon`,
  `TickIcon`): they weren't Prettier-formatted before, and leaving them keeps
  the history as clean renames.

## 6. Verification

| Check                                             | Result                                                                                                                                           |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Lockfile versions                                 | Identical to the npm lockfile (517 packages)                                                                                                     |
| `pnpm typecheck`                                  | Pass for both packages, every phase                                                                                                              |
| `pnpm lint`                                       | 0 errors; the same 5 warnings as before                                                                                                          |
| Import rule                                       | Importing `monitor-site` by path and by name: both errors. `@repo/ui` import: allowed                                                            |
| `pnpm build:site`                                 | Pass, all 23 routes, every phase                                                                                                                 |
| Pixel diff of 11 page / size screenshots          | After each Phase 2 group: identical, apart from three known animation / lazy-image spots, each checked by eye                                    |
| Classes only in `packages/ui`                     | Present in the compiled CSS (`@source` works)                                                                                                    |
| `docker build -f apps/personal-site/Dockerfile .` | Pass: 333 MB, pnpm 10.34.9, `sharp` musl build included                                                                                          |
| Container against local Postgres                  | Migrations ran (nothing new), pages and assets 200, `next/image` works, wrong password refused, real login works, resources page shows real data |

**Not verified:** the first real GitHub Actions run, the homelab deploy, and
clicking through the modals and forms in a browser.

## 7. Risks and things to watch

- **First CI run.** The workflow is now called "Personal site". If it fails,
  nothing is pushed, so the live site is unaffected.
- **Container working folder** is `/app/apps/personal-site` (was `/app`). If
  the homelab compose file sets `working_dir` or `command`, or mounts into
  `/app/...`, update it.
- **Env file** is `apps/personal-site/.env.local`. Production env vars come
  from the homelab and aren't affected. Docker's `--env-file` keeps quotes in
  values, so don't point it at a file using `KEY="value"`.
- **New install scripts** are skipped until the package is in
  `onlyBuiltDependencies`.
- **pnpm 12** needs a newer corepack locally and in the Docker base image.
- During Docker testing, an error message printed the local dev database URL
  (with its password) into the session output. Change that password if it's
  used anywhere else.

## 8. Follow-ups

- Rename the root folder to `olivernorrie` (close VS Code first). Nothing in
  the repo depends on the folder name.
- Point the local remote at the renamed GitHub repo:
  `git remote set-url origin git@github.com:GrayHound85/personal-site.git`.
- Add a migration that seeds the resource types, so a fresh database isn't
  empty (currently added by hand, see the wiki's database page).
