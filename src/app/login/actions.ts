"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import type { FormState } from "@/types/forms";

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
    if (error instanceof AuthError) {
      return { status: "error", message: "Incorrect password." };
    }

    throw error;
  }

  return null;
}
