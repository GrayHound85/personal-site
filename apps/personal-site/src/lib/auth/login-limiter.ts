import "server-only";

const MAX_FAILURES = 5;
const FAILURE_WINDOW_MS = 15 * 60 * 1000;
const LOCKOUT_MS = 15 * 60 * 1000;
const PRUNE_THRESHOLD = 1000;

type Attempts = {
  failures: number;
  windowStart: number;
  lockedUntil: number;
};

// Kept on globalThis so the auth route handler and the login server action
// share one store even if Next bundles this module more than once.
const globalStore = globalThis as typeof globalThis & {
  __loginAttempts?: Map<string, Attempts>;
};
const attempts = (globalStore.__loginAttempts ??= new Map());

// Behind the Cloudflare tunnel, CF-Connecting-IP is the visitor's address.
export function getClientIp(headers: Headers): string {
  return (
    headers.get("cf-connecting-ip") ??
    headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    headers.get("x-real-ip") ??
    "unknown"
  );
}

function prune(now: number) {
  if (attempts.size < PRUNE_THRESHOLD) {
    return;
  }

  for (const [ip, entry] of attempts) {
    if (
      entry.lockedUntil <= now &&
      now - entry.windowStart > FAILURE_WINDOW_MS
    ) {
      attempts.delete(ip);
    }
  }
}

/** Milliseconds until the IP may try again, or 0 if it isn't locked out. */
export function getLockoutRemaining(ip: string): number {
  const entry = attempts.get(ip);
  return entry ? Math.max(0, entry.lockedUntil - Date.now()) : 0;
}

export function recordLoginFailure(ip: string): void {
  const now = Date.now();
  prune(now);

  const entry = attempts.get(ip);

  if (!entry || now - entry.windowStart > FAILURE_WINDOW_MS) {
    attempts.set(ip, { failures: 1, windowStart: now, lockedUntil: 0 });
    return;
  }

  entry.failures += 1;

  if (entry.failures >= MAX_FAILURES) {
    entry.lockedUntil = now + LOCKOUT_MS;
    entry.failures = 0;
    entry.windowStart = now;
    console.warn(
      "[login-limiter]",
      JSON.stringify({ ip, lockedForMinutes: LOCKOUT_MS / 60000 }),
    );
  }
}

export function clearLoginFailures(ip: string): void {
  attempts.delete(ip);
}
