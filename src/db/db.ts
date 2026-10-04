import "server-only";

import { drizzle } from "drizzle-orm/postgres-js";

import { DatabaseConnectionError, isDatabaseConnectionError } from "./errors";

let db: ReturnType<typeof drizzle> | undefined;

export function getDb() {
  if (!db) {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
      throw new Error("DATABASE_URL is required to run database queries.");
    }

    db = drizzle(databaseUrl);
  }

  return db;
}

export async function executeDatabaseQuery<T>(
  query: () => Promise<T>,
): Promise<T> {
  try {
    return await query();
  } catch (error) {
    if (isDatabaseConnectionError(error)) {
      throw new DatabaseConnectionError();
    }

    throw error;
  }
}
