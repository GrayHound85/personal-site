Nov 2026: single npm app → pnpm workspace. Full report:
[`docs/monorepo-migration.md`](https://github.com/GrayHound85/personal-site/blob/main/docs/monorepo-migration.md)

| Before                                             | After                                                         |
| -------------------------------------------------- | ------------------------------------------------------------- |
| `src/`, `public/`, `drizzle/`, configs at the root | `apps/personal-site/`                                         |
| Shared components in `src/components/ui/`          | `packages/ui/src/components/` (`@repo/ui`)                    |
| `src/app/globals.css`                              | `packages/ui/src/theme.css` (site's `globals.css` imports it) |
| `ProjectTags`                                      | `TagDots`                                                     |
| `src/types/forms.ts`                               | `@repo/ui/types/forms`                                        |
| `npm run dev` / `build`                            | `pnpm dev:site` / `build:site`                                |
| `production.yml`                                   | `personal-site.yml` (path filtered)                           |
| `.env.local` at the root                           | `apps/personal-site/.env.local`                               |
| Container runs from `/app`                         | `/app/apps/personal-site`                                     |
