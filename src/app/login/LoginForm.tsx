"use client";

import { useActionState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { loginAction } from "./actions";

export default function LoginForm({ redirectTo }: { redirectTo?: string }) {
  const [state, formAction, pending] = useActionState(loginAction, null);

  return (
    <form action={formAction} className="mt-8 space-y-5 text-text-primary">
      <Input
        aria-label="Password"
        autoComplete="current-password"
        className="login-password-input"
        name="password"
        placeholder="Password"
        required
        type="password"
      />
      <input name="redirectTo" type="hidden" value={redirectTo ?? ""} />
      {state?.error && (
        <p className="text-sm text-red-500" role="alert">
          {state.error}
        </p>
      )}
      <Button className="w-full" disabled={pending} type="submit">
        {pending ? "Signing in..." : "Login"}
      </Button>
    </form>
  );
}
