# Builds the personal site. Run from the repo root, the build needs the whole
# workspace (packages/ui, the lockfile):
#   docker build -f apps/personal-site/Dockerfile .

FROM node:22-alpine AS dependencies

WORKDIR /repo

# pnpm comes from corepack, at the version pinned in the root package.json
RUN corepack enable

# Only the files pnpm needs, so this layer stays cached until dependencies change
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/personal-site/package.json ./apps/personal-site/
COPY packages/ui/package.json ./packages/ui/

# node-linker=hoisted gives a flat node_modules like npm's, so the runner
# stage can copy postgres and drizzle-orm straight out of it for migrate.mjs
RUN pnpm install --frozen-lockfile --config.node-linker=hoisted


FROM node:22-alpine AS builder

WORKDIR /repo

RUN corepack enable

COPY --from=dependencies /repo ./
COPY . .

ARG GIT_COMMIT
ENV GIT_COMMIT=$GIT_COMMIT

RUN pnpm --filter personal-site build


FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# The standalone output mirrors the repo layout, with the server in
# apps/personal-site/. Static files, public/ and the migrations go next to it.
COPY --from=builder /repo/apps/personal-site/.next/standalone ./
COPY --from=builder /repo/apps/personal-site/.next/static ./apps/personal-site/.next/static
COPY --from=builder /repo/apps/personal-site/public ./apps/personal-site/public
COPY --from=builder /repo/apps/personal-site/drizzle/migrations ./apps/personal-site/drizzle/migrations
COPY --from=builder /repo/apps/personal-site/scripts/migrate.mjs ./apps/personal-site/scripts/migrate.mjs

# migrate.mjs runs outside Next, so its packages aren't in the standalone
# trace. Copy them in full, it finds them in /app/node_modules.
COPY --from=dependencies /repo/node_modules/postgres ./node_modules/postgres
COPY --from=dependencies /repo/node_modules/drizzle-orm ./node_modules/drizzle-orm

WORKDIR /app/apps/personal-site

EXPOSE 3000

CMD ["sh", "-c", "node scripts/migrate.mjs && node server.js"]
