Everything is **private (admin) by default**. Unmatched paths redirect to
`/login`.

**File:** `apps/personal-site/src/lib/auth/access.ts` → `ACCESS_RULES`

```ts
{ path: "/projects", roles: "public", includeChildren: true },
{ path: "/media", roles: ["admin", "media"], includeChildren: true },
```

- Longest matching rule wins.
- New public page or file route (e.g. `sitemap.xml`) → add a rule.
- Public page that should be indexed → also add it to `src/app/sitemap.ts`
  (projects are added automatically).
- Server actions: call `requirePathAccess(path)` first. The proxy doesn't
  protect them.

Login: one admin password (`AUTH_PASSWORD`). No users table yet.
