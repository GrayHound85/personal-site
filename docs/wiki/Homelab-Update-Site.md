Pull the new site image and restart **only** the site container. Postgres
keeps running.

> **Check once:** the compose service name. Commands below assume
> `personal-site`. Find yours with `docker compose ps --format '{{.Service}}  {{.Image}}'`
> (the one using `ghcr.io/grayhound85/personal-site`).

## 1. Wait for CI

The image only changes after the **Personal site** workflow on GitHub has
finished for your push to `main`. → [CI and Images](CI-And-Images)

## 2. Update

```bash
cd <compose folder>

# keep the current image so you can roll back
docker tag ghcr.io/grayhound85/personal-site:latest ghcr.io/grayhound85/personal-site:previous

docker compose pull personal-site
docker compose up -d --no-deps personal-site
```

`--no-deps` stops Compose touching anything the site depends on (Postgres).

## 3. Check it

```bash
docker compose logs -f --tail 50 personal-site
```

Expect `Database migrations complete.` then `✓ Ready`. Then open the site and
check the footer's build commit matches what you pushed.

## 4. Tidy up (optional, once you're happy)

```bash
docker image prune -f
```

Removes untagged old images. `:previous` stays until you delete it.

## Broke something?

[Roll back](Homelab-Troubleshooting#roll-back-to-the-previous-image)
