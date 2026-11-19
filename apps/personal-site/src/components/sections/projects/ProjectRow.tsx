import Link from "next/link";

import TagDots from "@repo/ui/components/TagDots";
import type { ProjectDefinition } from "@/types/projects";

type ProjectRowProps = {
  project: ProjectDefinition;
};

// One row in the /projects list, like a repo in a GitHub repositories tab
export default function ProjectRow({ project }: ProjectRowProps) {
  return (
    <li className="reveal-on-scroll border-b border-white/10 py-6 first:pt-0 last:border-b-0 last:pb-0">
      <div className="flex flex-wrap items-center gap-3">
        <Link
          href={`/projects/${project.slug}`}
          className="font-mono text-xl font-semibold text-primary hover:underline"
        >
          {project.slug}
        </Link>
        {project.featured && (
          <span className="rounded-full border border-white/20 px-2 text-xs text-text-secondary">
            Pinned
          </span>
        )}
      </div>

      <p className="mt-2 max-w-3xl leading-relaxed text-text-secondary">
        {project.summary}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2">
        <TagDots tags={project.tags} />
        <span className="text-xs text-text-secondary">{project.year}</span>
      </div>
    </li>
  );
}
