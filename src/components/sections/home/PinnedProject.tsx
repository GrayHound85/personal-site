import BookIcon from "@c/icons/BooksIcon";
import LinkCard from "@c/ui/LinkCard";
import type { ProjectDefinition } from "@/types/projects";

// Dot colours for tags, like the language colours on GitHub.
// Tags not listed here fall back to the primary colour.
const tagColours: Record<string, string> = {
  TypeScript: "#3178c6",
  PostgreSQL: "#4f8cc9",
  Docker: "#2496ed",
  Linux: "#f2c94c",
  Infrastructure: "#53bab8",
  Web: "#e8735a",
};

type PinnedProjectProps = {
  project: ProjectDefinition;
};

export default function PinnedProject({ project }: PinnedProjectProps) {
  return (
    <LinkCard
      href={`/projects/${project.slug}`}
      className="flex flex-col rounded-card_inner p-5 hover:scale-[1.01]"
    >
      <div className="flex items-center gap-2">
        <BookIcon aria-hidden="true" className="h-4 w-4 text-text-secondary" />
        <h3 className="font-mono font-semibold text-primary">{project.slug}</h3>
        <span className="ml-auto text-xs text-text-secondary">
          {project.year}
        </span>
      </div>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary">
        {project.summary}
      </p>

      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-text-secondary">
        {project.tags.map((tag) => (
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
    </LinkCard>
  );
}
