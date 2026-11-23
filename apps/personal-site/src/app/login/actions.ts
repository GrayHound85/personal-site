"use server";

import { AuthError } from "next-auth";
import { headers } from "next/headers";
import { LoginRateLimited, signIn } from "@/auth";
import { getClientIp, getLockoutRemaining } from "@l/auth/login-limiter";
import type { FormState } from "@repo/ui/types/forms";

export async function loginAction(
  _state: FormState,
  formData: FormData,
): Promise<FormState> {
  const password = formData.get("password");
  const requestedRedirect = formData.get("redirectTo");
  const redirectTo =
    typeof requestedRedirect === "string" &&
    requestedRedirect.startsWith("/") &&
    !requestedRedirect.startsWith("//")
      ? requestedRedirect
      : "/dashboard";

  if (typeof password !== "string" || password.length === 0) {
    return { status: "error", message: "Enter your password." };
  }

  try {
    await signIn("credentials", { password, redirectTo });
  } catch (error) {
    if (error instanceof LoginRateLimited) {
      const minutes = Math.ceil(
        getLockoutRemaining(getClientIp(await headers())) / 60000,
      );
      return {
        status: "error",
        message: `Too many attempts. Try again in ${Math.max(minutes, 1)} min.`,
      };
    }

    if (error instanceof AuthError) {
      return { status: "error", message: "Incorrect password." };
    }

    throw error;
  }

  return null;
}
