"use client";

import { useEffect } from "react";

import ConnectionError from "@c/errors/ConnectionError";
import GenericError from "@c/errors/GenericError";
import { isDatabaseConnectionError } from "@/db/errors";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  if (isDatabaseConnectionError(error)) {
    return (
      <ConnectionError
        title="Database unavailable"
        message="We couldn't connect to the database. Please try again in a moment."
        onRetry={reset}
      />
    );
  }

  return (
    <GenericError
      title="Something went wrong"
      message="An unexpected error occurred. Please try again."
      onRetry={reset}
    />
  );
}
