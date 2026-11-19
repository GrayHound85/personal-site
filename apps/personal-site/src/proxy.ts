import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { canAccessPath, getRoleHomePath } from "@/lib/auth/access";

const AUTH_DEBUG_ENABLED =
  process.env.NODE_ENV !== "production" || process.env.AUTH_DEBUG === "true";

const SESSION_COOKIE_NAMES = [
  "authjs.session-token",
  "__Secure-authjs.session-token",
  "next-auth.session-token",
  "__Secure-next-auth.session-token",
];

function logAuthDecision(
  request: Parameters<Parameters<typeof auth>[0]>[0],
  decision: string,
) {
  if (!AUTH_DEBUG_ENABLED) {
    return;
  }

  const role = request.auth?.user?.role;
  const sessionCookiePresent = request.cookies
    .getAll()
    .some(({ name }) =>
      SESSION_COOKIE_NAMES.some(
        (cookieName) =>
          name === cookieName || name.startsWith(`${cookieName}.`),
      ),
    );

  console.info(
    "[auth-debug]",
    JSON.stringify({
      method: request.method,
      path: request.nextUrl.pathname,
      sessionCookiePresent,
      sessionResolved: Boolean(request.auth?.user),
      role: role ?? null,
      decision,
    }),
  );
}

export const proxy = auth((request) => {
  const { pathname, search } = request.nextUrl;

  if (pathname.startsWith("/api/auth/")) {
    logAuthDecision(request, "pass_auth_endpoint");
    return NextResponse.next();
  }

  const role = request.auth?.user?.role;

  if (canAccessPath(role, pathname)) {
    logAuthDecision(request, role ? "allow_role" : "allow_public");
    return NextResponse.next();
  }

  if (role) {
    logAuthDecision(request, "redirect_insufficient_role");
    return NextResponse.redirect(new URL(getRoleHomePath(role), request.url));
  }

  logAuthDecision(request, "redirect_login");
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("callbackUrl", `${pathname}${search}`);
  return NextResponse.redirect(loginUrl);
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.svg$|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.webp$|.*\\.ico$|.*\\.css$|.*\\.js$|.*\\.woff$|.*\\.woff2$).*)",
  ],
};
