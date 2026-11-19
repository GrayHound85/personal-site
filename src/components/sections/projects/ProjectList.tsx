import type { ReactNode } from "react";

type ProjectListProps = {
  items: { label: string; text: ReactNode }[];
};

// A bullet list where each item starts with a bold label,
// e.g. "Operating system: Ubuntu Server..."
export default function ProjectList({ items }: ProjectListProps) {
  return (
    <ul className="list-disc space-y-3 pl-5 marker:text-primary">
      {items.map((item) => (
        <li key={item.label}>
          <strong>{item.label}:</strong> {item.text}
        </li>
      ))}
    </ul>
  );
}
