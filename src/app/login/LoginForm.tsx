"use client";

import { useActionState } from "react";
import Form from "@/components/ui/Form";
import Input from "@/components/ui/Input";
import { loginAction } from "./actions";

export default function LoginForm({ redirectTo }: { redirectTo?: string }) {
  const [state, formAction, pending] = useActionState(loginAction, null);

  return (
    <Form
      action={formAction}
      className="mt-8 text-text-primary"
      error={state?.error}
      pending={pending}
      pendingText="Signing in..."
      submitButtonClassName="w-full"
      submitText="Login"
    >
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
    </Form>
  );
}
