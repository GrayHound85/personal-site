import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export type DropDownOptionProps = {
  value: string;
  children: ReactNode;
  className?: string;
  onSelect?: (value: string) => void;
};

export default function DropDownOption({
  value,
  children,
  className,
  onSelect,
}: DropDownOptionProps) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect?.(value)}
        className={twMerge(
          `
            inline-flex
            w-full
            items-center
            rounded-lg
            p-2
            text-left
            text-sm
            font-medium
            text-text-primary
            transition-colors
            hover:bg-primary
          `,
          className,
        )}
      >
        {children}
      </button>
    </li>
  );
}
