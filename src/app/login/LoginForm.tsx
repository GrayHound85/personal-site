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
      className="text-text-primary"
      error={state?.error}
      pending={pending}
      pendingText="Signing in..."
      submitButtonClassName="w-full"
      submitText="Sign in"
    >
      <label className="flex flex-col gap-2">
        <span className="font-mono text-xs text-text-secondary">password</span>
        <Input
          autoComplete="current-password"
          className="login-password-input"
          name="password"
          required
          type="password"
        />
      </label>
      <input name="redirectTo" type="hidden" value={redirectTo ?? ""} />
    </Form>
  );
}
