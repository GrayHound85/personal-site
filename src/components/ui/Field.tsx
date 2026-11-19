import type { ReactNode } from "react";

type FieldProps = {
  label: string;
  children: ReactNode;
};

// A label above a form control. The control goes inside the <label>, so
// they're linked without needing ids.
export default function Field({ label, children }: FieldProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-xs text-text-secondary">{label}</span>
      {children}
    </label>
  );
}
