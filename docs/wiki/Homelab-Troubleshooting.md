## Site down

```bash
docker compose ps                                   # is it running?
docker compose logs --tail 100 personal-site        # why it stopped
docker compose restart personal-site                # restart just the site
```

| Log says                                     | Fix                                                                                |
| -------------------------------------------- | ---------------------------------------------------------------------------------- |
| `DATABASE_URL is required`                   | Env vars missing from the site service                                             |
| `ERR_INVALID_URL` with quotes around the URL | Env file has `KEY="value"`, use `KEY=value` for Docker                             |
| Migration error                              | Check [migration history](Homelab-Database#see-which-migrations-have-run)          |
| "Database unavailable" page                  | Postgres down: `docker compose ps`, then `docker compose up -d <postgres service>` |

## Roll back to the previous image

Works if you tagged `:previous` before updating
([Update Site](Homelab-Update-Site) step 2).

```bash
docker tag ghcr.io/grayhound85/personal-site:previous ghcr.io/grayhound85/personal-site:latest
docker compose up -d --no-deps personal-site
```

Migrations that already ran are **not** undone. If the new version changed the
schema, roll forward with a fix instead.

No `:previous`? Untagged older images may still be there until you prune:
`docker images --filter dangling=true`, then `docker tag <IMAGE ID> ghcr.io/grayhound85/personal-site:latest`.

## Container path changed (Nov 2026)

The server runs from `/app/apps/personal-site` (was `/app`). If the compose
file sets `working_dir`, `command` or mounts into `/app/...`, update them.
