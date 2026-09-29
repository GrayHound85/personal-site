import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={`
                w-full
                rounded-xl
                border
                border-border
                bg-panel
                px-4
                py-3
                outline-none
                transition
                focus:border-primary
                focus:ring-2
                focus:ring-blue-200
                ${className ?? ""}
            `}
      {...props}
    />
  );
}
