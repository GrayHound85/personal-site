const DATABASE_CONNECTION_ERROR_DIGEST = "DATABASE_CONNECTION_ERROR";

export class DatabaseConnectionError extends Error {
  readonly digest = DATABASE_CONNECTION_ERROR_DIGEST;

  constructor() {
    super("Database connection unavailable");
    this.name = "DatabaseConnectionError";
  }
}

export function isDatabaseConnectionError(error: unknown): boolean {
  let current: unknown = error;

  while (current instanceof Error) {
    if (
      current.name === "DatabaseConnectionError" ||
      ("digest" in current &&
        current.digest === DATABASE_CONNECTION_ERROR_DIGEST)
    ) {
      return true;
    }

    const code = "code" in current ? current.code : undefined;

    if (code === "ECONNREFUSED") {
      return true;
    }

    current = current.cause;
  }

  return false;
}
