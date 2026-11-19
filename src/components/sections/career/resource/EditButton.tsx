import { twMerge } from "tailwind-merge";

import PencilIcon from "@c/icons/PencilIcon";

type EditButtonProps = {
  // Read by screen readers and shown as a tooltip, e.g. "Edit JavaScript"
  label: string;
  onClick: () => void;
  className?: string;
};

// The small pencil button that opens an edit form
export default function EditButton({
  label,
  onClick,
  className,
}: EditButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={twMerge(
        "flex h-7 w-7 shrink-0 items-center justify-center rounded-button text-text-secondary transition-colors hover:bg-white/10 hover:text-text-primary",
        className,
      )}
    >
      <PencilIcon aria-hidden="true" className="h-3.5 w-3.5" />
    </button>
  );
}
