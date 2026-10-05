import type { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export type DropDownOptionProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "value" | "onSelect"
> & {
  value: string;
  children: ReactNode;
  onSelect?: (value: string) => void;
  selected?: boolean;
};

export default function DropDownOption({
  value,
  children,
  className,
  onSelect,
  selected = false,
}: DropDownOptionProps) {
  return (
    <li role="presentation">
      <button
        type="button"
        role="option"
        aria-selected={selected}
        onClick={() => onSelect?.(value)}
        className={twMerge(
          "inline-flex w-full items-center rounded-lg p-2 text-left text-sm font-medium text-text-primary transition-colors hover:bg-primary",
          className,
        )}
      >
        {children}
      </button>
    </li>
  );
}
