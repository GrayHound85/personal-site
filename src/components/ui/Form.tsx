"use client";

import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import Button from "@c/ui/Button";

type FormProps = {
  children: ReactNode;
  action: (formData: FormData) => void | Promise<void>;
  submitText: string;
  pending?: boolean;
  pendingText?: string;
  error?: string | null;
  className?: string;
  submitButtonClassName?: string;
};

export default function Form({
  children,
  action,
  submitText,
  pending = false,
  pendingText = "Submitting...",
  error,
  className,
  submitButtonClassName,
}: FormProps) {
  return (
    <form
      action={action}
      className={twMerge("flex w-full flex-col gap-5", className)}
    >
      {children}

      {error && (
        <p className="text-sm text-red-500" role="alert">
          {error}
        </p>
      )}

      <Button
        className={submitButtonClassName}
        disabled={pending}
        type="submit"
      >
        {pending ? pendingText : submitText}
      </Button>
    </form>
  );
}
