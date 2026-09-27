import "server-only";

import { drizzle } from "drizzle-orm/postgres-js";

import { DatabaseConnectionError, isDatabaseConnectionError } from "./errors";

export const db = drizzle(process.env.DATABASE_URL!);

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
