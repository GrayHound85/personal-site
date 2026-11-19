```
apps/personal-site/   the Next.js site (pages, DB, auth, server actions)
apps/monitor-site/    reserved for the monitoring app
packages/ui/          @repo/ui: shared components, icons, FormState, theme.css
docs/                 site-guide.md, monorepo-migration.md, wiki/ (this wiki)
.github/workflows/    personal-site.yml (image), wiki.yml (publishes this wiki)
```

## Rules

- **Apps import from `packages/`, never from each other.** ESLint errors on
  it: each app's `eslint.config.mjs` lists the others in `otherApps`.
- `packages/ui` can't import from apps or use `@/` / `@c/` aliases. Inside it,
  import relatively.
- Only generic code goes in `packages/`. Site data, DB, server actions and
  auth stay in the app.
- Dependencies go in the app or package that uses them, never the root.

## Where things are in the site

| Thing              | Path (in `apps/personal-site/src/`) |
| ------------------ | ----------------------------------- |
| Pages              | `app/`                              |
| Server actions     | `app/actions/a-*.ts`                |
| Business logic     | `lib/service/s-*.ts`                |
| SQL queries        | `lib/repo/r-*.ts`                   |
| Schema             | `db/schema.ts`                      |
| Access rules       | `lib/auth/access.ts`                |
| Projects list      | `config/projects.ts`                |
| Feature components | `components/sections/<area>/`       |
| Page shells        | `components/layout/`                |

Aliases (site only): `@/` → `src/`, `@c/` → `src/components/`, `@l/` →
`src/lib/`, `@d/` → `src/db/`.

## Adding the monitoring app (later)

1. `apps/monitor-site/` with its own `package.json` (name `monitor-site`).
2. Copy the `otherApps` ESLint block, listing `personal-site`.
3. Root scripts: `dev:monitor` etc. (`pnpm --filter monitor-site …`).
4. Uncomment Monitoring in `olivernorrie.code-workspace`.
5. Its own workflow: copy `personal-site.yml` with its own `paths`.
6. Wiki: add its pages and a sidebar section.
