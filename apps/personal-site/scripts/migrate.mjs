import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required to run migrations.");
}

const client = postgres(databaseUrl);
const db = drizzle({ client });

try {
  console.log("Running database migrations...");
  await migrate(db, {
    migrationsFolder: "./drizzle/migrations",
  });
  console.log("Database migrations complete.");
} finally {
  await client.end();
}
