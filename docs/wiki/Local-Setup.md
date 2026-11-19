Once per machine.

```bash
corepack enable pnpm     # add sudo, or --install-directory ~/.local/bin
git clone git@github.com:GrayHound85/personal-site.git olivernorrie
cd olivernorrie
pnpm install
```

1. Create `apps/personal-site/.env.local` with `DATABASE_URL`,
   `AUTH_SECRET` and `AUTH_PASSWORD`. (Next only reads env files from the
   app's own folder.)
2. Start Postgres: `docker compose -f apps/personal-site/compose.yaml up -d postgres`
3. `pnpm db:migrate`
4. `pnpm dev:site`

**VS Code:** File → Open Workspace from File → `olivernorrie.code-workspace`.

pnpm version comes from `packageManager` in the root `package.json`
(currently 10.34.9). Don't install pnpm 12: Node 22's corepack can't run it.
