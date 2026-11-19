import Field from "@c/ui/Field";
import Form from "@c/ui/Form";
import Input from "@c/ui/Input";
import { loginAction } from "./actions";

export default function LoginForm({ redirectTo }: { redirectTo?: string }) {
  return (
    <Form
      action={loginAction}
      submitText="Sign in"
      pendingText="Signing in..."
      submitClassName="w-full"
    >
      <Field label="password">
        <Input
          autoComplete="current-password"
          name="password"
          required
          type="password"
        />
      </Field>
      <input name="redirectTo" type="hidden" value={redirectTo ?? ""} />
    </Form>
  );
}
