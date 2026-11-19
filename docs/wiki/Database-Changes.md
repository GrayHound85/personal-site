## Change the schema

1. Edit `apps/personal-site/src/db/schema.ts`.
2. `pnpm db:generate`
3. Read the new SQL in `apps/personal-site/drizzle/migrations/`.
4. `pnpm db:migrate` (local) and test.
5. Commit the schema **and** the migration folder.
6. Deploy: the container applies it on start. → [Homelab: Update Site](Homelab-Update-Site)

## Data the app needs (seed rows)

Use a custom migration so every database gets it:

```bash
pnpm --filter personal-site exec drizzle-kit generate --custom --name seed_something
```

Write idempotent SQL in it (`INSERT … ON CONFLICT DO NOTHING`).

## Rules

- Never edit an applied migration; add a new one.
- Never change the homelab schema by hand.
- Wrap queries in `executeDatabaseQuery(...)` (`src/db/db.ts`).
- Layers: action `a-*` → service `s-*` → repo `r-*` → `db/`.
- A new runtime dependency of `scripts/migrate.mjs` must also be copied in the Dockerfile.
