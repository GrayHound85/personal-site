> **Check once:** container `personal-site-postgres`, user `postgres`,
> database `personal_site` are the local names. On the homelab: container from
> `docker ps`, user and database from the site's `DATABASE_URL`
> (`postgres://USER:PASSWORD@HOST:5432/DATABASE`). No password needed with
> `docker exec`.

## Open a SQL shell

```bash
docker exec -it personal-site-postgres psql -U postgres -d personal_site
```

`\dt` lists tables, `\q` quits.

## Add resource types

```bash
docker exec -i personal-site-postgres psql -U postgres -d personal_site <<'SQL'
INSERT INTO "ResourceType" ("code", "name") VALUES
  ('video', 'Video'),
  ('website', 'Website'),
  ('book', 'Book'),
  ('docs', 'Documentation')
ON CONFLICT ("code") DO NOTHING;
SQL
```

Safe to re-run. New type → also add its code to `resourceTypeIcons` and
`resourceTypeNames` in
`apps/personal-site/src/components/sections/career/resource/ResourcesList.tsx`.

List them: `SELECT "code", "name" FROM "ResourceType";`

## See which migrations have run

```bash
docker exec -i personal-site-postgres psql -U postgres -d personal_site \
  -c 'SELECT id, name, applied_at FROM drizzle."__drizzle_migrations" ORDER BY id;'
```

## Back up

```bash
docker exec personal-site-postgres pg_dump -U postgres -d personal_site > personal_site-$(date +%F).sql
```

## Restore

```bash
docker exec -i personal-site-postgres psql -U postgres -d personal_site < personal_site-YYYY-MM-DD.sql
```

Restore into an empty database (or one you're happy to overwrite). Back up
first.

## Don't

- Run `drizzle/seed.ts` against the homelab: it deletes every resource.
- Change the schema by hand: use a migration. → [Database Changes](Database-Changes)
