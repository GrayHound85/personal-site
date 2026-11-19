All from the repo root.

## Everyday

```bash
pnpm dev:site            # localhost:3000
pnpm build:site          # production build
pnpm start:site          # run that build
pnpm lint                # every app and package
pnpm typecheck           # every app and package
```

**Before committing:** `pnpm lint && pnpm typecheck && pnpm build:site`

## Database (local)

```bash
docker compose -f apps/personal-site/compose.yaml up -d postgres   # start Postgres
pnpm db:generate         # make a migration after changing src/db/schema.ts
pnpm db:migrate          # apply migrations locally
pnpm --filter personal-site exec tsx drizzle/seed.ts   # WIPE + reseed resources (local only!)
```

## Dependencies

```bash
pnpm --filter personal-site add <pkg>      # site dependency
pnpm --filter personal-site add -D <pkg>   # site dev dependency
pnpm --filter @repo/ui add <pkg>           # shared components dependency
pnpm install                               # after pulling changes
```

Never add to the root. A package that needs an install script → add it to
`onlyBuiltDependencies` in `pnpm-workspace.yaml`.

## Docker (local)

```bash
docker build -f apps/personal-site/Dockerfile .   # from the repo root
```

## See also

[Homelab: Update Site](Homelab-Update-Site) · [Homelab: Database](Homelab-Database)
