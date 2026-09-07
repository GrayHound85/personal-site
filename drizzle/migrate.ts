import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";

async function main() {
  const db = drizzle(process.env.DATABASE_URL as string);

  await migrate(db, {
    migrationsFolder: "./drizzle/migrations",
  });
}

main();
