## What runs when

| Workflow                              | Runs on push to `main` when these change                                                                                       | Does                                                         |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------ |
| `personal-site.yml` ("Personal site") | `apps/personal-site/**`, `packages/**`, `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`, `.dockerignore`, the workflow | Builds and pushes `ghcr.io/grayhound85/personal-site:latest` |
| `wiki.yml` ("Publish wiki")           | `docs/wiki/**`, the workflow                                                                                                   | Copies `docs/wiki/` to this wiki                             |

Docs-only changes don't rebuild the image. Day-to-day work happens on `dev`;
merge to `main` to deploy, then [update the homelab](Homelab-Update-Site).

## Build the image locally

```bash
docker build -f apps/personal-site/Dockerfile .    # from the repo root
```

## How the image works

- pnpm install with `--config.node-linker=hoisted` (flat `node_modules`).
- Next standalone output traced from the repo root; the server runs from
  `/app/apps/personal-site`.
- Start: `node scripts/migrate.mjs && node server.js` (migrations apply on
  every start; nothing happens if there are none).
- `postgres` and `drizzle-orm` are copied in for `migrate.mjs`.
- `sharp` (for `next/image`) is allowed to build via `onlyBuiltDependencies`.

## Footer build stamp

`build abc1234 · date` comes from `apps/personal-site/next.config.ts`
(`BUILD_COMMIT`, `BUILD_DATE`). CI passes the commit as `GIT_COMMIT`; locally
it uses `git rev-parse`.
