FROM node:22-alpine AS dependencies

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci


FROM node:22-alpine AS builder

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

RUN npm run build


FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/drizzle/migrations ./drizzle/migrations
COPY --from=builder /app/scripts/migrate.mjs ./scripts/migrate.mjs

COPY --from=dependencies /app/node_modules/postgres ./node_modules/postgres
COPY --from=dependencies /app/node_modules/drizzle-orm ./node_modules/drizzle-orm

EXPOSE 3000

CMD ["sh", "-c", "node scripts/migrate.mjs && node server.js"]