"use client";

import type { SubmitEvent, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import Button from "@c/ui/Button";

type FormProps = {
  children: ReactNode;
  submitText: string;
  onSubmit?: (formData: FormData) => void | Promise<void>;
  className?: string;
};

export default function Form({
  children,
  submitText,
  onSubmit,
  className,
}: FormProps) {
  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);

    await onSubmit?.(formData);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={twMerge("w-100 flex flex-col gap-5", className)}
    >
      {children}

      <Button type="submit">{submitText}</Button>
    </form>
  );
}
