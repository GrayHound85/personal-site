import { twMerge } from "tailwind-merge";

// Dot colours for tags, like the language colours on GitHub.
// Tags not listed here fall back to the primary colour.
const tagColours: Record<string, string> = {
  "Next.js": "#e5e7eb",
  TypeScript: "#3178c6",
  PostgreSQL: "#4f8cc9",
  Docker: "#2496ed",
  "Ubuntu Server": "#e95420",
  "Cloudflare Tunnels": "#f6a821",
  Linux: "#f2c94c",
  Python: "#3572a5",
};

type ProjectTagsProps = {
  tags: string[];
  className?: string;
};

export default function ProjectTags({ tags, className }: ProjectTagsProps) {
  return (
    <ul
      className={twMerge(
        "flex flex-wrap gap-x-4 gap-y-1 text-xs text-text-secondary",
        className,
      )}
    >
      {tags.map((tag) => (
        <li key={tag} className="flex items-center gap-1.5">
          <span
            aria-hidden="true"
            className="h-2.5 w-2.5 rounded-full"
            style={{
              backgroundColor: tagColours[tag] ?? "var(--color-primary)",
            }}
          />
          {tag}
        </li>
      ))}
    </ul>
  );
}
