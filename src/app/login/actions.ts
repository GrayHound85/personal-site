"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";

export type LoginState = {
  error?: string;
} | null;

export async function loginAction(
  _state: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const password = formData.get("password");
  const requestedRedirect = formData.get("redirectTo");
  const redirectTo =
    typeof requestedRedirect === "string" &&
    requestedRedirect.startsWith("/") &&
    !requestedRedirect.startsWith("//")
      ? requestedRedirect
      : "/dashboard";

  if (typeof password !== "string" || password.length === 0) {
    return { error: "Enter your password." };
  }

  try {
    await signIn("credentials", { password, redirectTo });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Incorrect password." };
    }

    throw error;
  }

  return null;
}
