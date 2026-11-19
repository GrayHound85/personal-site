import type { ReactNode } from "react";

type ProjectDetailsProps = {
  items: { term: string; description: ReactNode }[];
};

// A two column list: a short bold term on the left, a description on the
// right. Stacks on mobile.
export default function ProjectDetails({ items }: ProjectDetailsProps) {
  return (
    <dl className="divide-y divide-white/10 border-y border-white/10">
      {items.map((item) => (
        <div
          key={item.term}
          className="grid gap-2 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6"
        >
          <dt className="font-semibold text-text-primary">{item.term}</dt>
          <dd>{item.description}</dd>
        </div>
      ))}
    </dl>
  );
}
