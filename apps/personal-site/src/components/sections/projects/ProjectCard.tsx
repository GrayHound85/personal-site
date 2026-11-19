import BookIcon from "@c/icons/BooksIcon";
import LinkCard from "@repo/ui/components/LinkCard";
import TagDots from "@repo/ui/components/TagDots";
import type { ProjectDefinition } from "@/types/projects";

type ProjectCardProps = {
  project: ProjectDefinition;
};

// The pinned project card on the home page
export default function ProjectCard({ project }: ProjectCardProps) {
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

      <TagDots tags={project.tags} className="mt-4" />
    </LinkCard>
  );
}
