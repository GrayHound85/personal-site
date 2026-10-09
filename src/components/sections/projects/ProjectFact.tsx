import type { ReactNode } from "react";

type ProjectFactProps = {
  label: string;
  value: ReactNode;
};

export default function ProjectFact({ label, value }: ProjectFactProps) {
  return (
    <div className="border-l-2 border-primary pl-4">
      <dt className="text-xs font-semibold uppercase text-text-secondary">
        {label}
      </dt>
      <dd className="mt-1 font-medium text-text-primary">{value}</dd>
    </div>
  );
}
