import type { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

// Shared look for text inputs and selects
export const fieldClassName =
  "w-full rounded-button border border-white/10 bg-black/20 px-4 py-3 text-text-primary outline-none transition-colors placeholder:text-text-secondary/50 hover:border-white/20 focus:border-primary focus:bg-black/30 disabled:cursor-not-allowed disabled:opacity-50";

export default function Input({ className, ...props }: InputProps) {
  return <input className={twMerge(fieldClassName, className)} {...props} />;
}
