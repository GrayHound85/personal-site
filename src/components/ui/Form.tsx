"use client";

import {
  useActionState,
  useEffect,
  useEffectEvent,
  type ReactNode,
} from "react";
import { twMerge } from "tailwind-merge";

import Button from "./Button";
import type { FormState } from "@/types/forms";

type FormProps = {
  // A server action returning a FormState (see src/types/forms.ts)
  action: (state: FormState, formData: FormData) => Promise<FormState>;
  submitText: string;
  pendingText?: string;
  // Runs once each time the action returns { status: "success" }
  onSuccess?: () => void;
  className?: string;
  submitClassName?: string;
  children: ReactNode;
};

// Wraps a server action in a form: tracks the pending state, shows the
// action's error message and renders the submit button. The fields go in
// children, usually <Field> with an <Input> or <Select> inside.
export default function Form({
  action,
  submitText,
  pendingText = "Saving...",
  onSuccess,
  className,
  submitClassName,
  children,
}: FormProps) {
  const [state, formAction, pending] = useActionState(action, null);

  // useEffectEvent so a new onSuccess function each render doesn't re-run it
  const handleSuccess = useEffectEvent(() => onSuccess?.());

  useEffect(() => {
    if (state?.status === "success") {
      handleSuccess();
    }
  }, [state]);

  return (
    <form
      action={formAction}
      className={twMerge("flex w-full flex-col gap-5", className)}
    >
      {children}

      {state?.status === "error" && (
        <p
          role="alert"
          className="rounded-button border border-red-300/30 bg-red-300/10 px-3 py-2 text-sm text-red-100"
        >
          {state.message}
        </p>
      )}

      <Button className={submitClassName} disabled={pending} type="submit">
        {pending ? pendingText : submitText}
      </Button>
    </form>
  );
}
