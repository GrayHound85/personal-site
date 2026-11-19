import type { ReactNode } from "react";

import GithubIcon from "@c/icons/GithubIcon";
import TagDots from "@repo/ui/components/TagDots";
import type { ProjectDefinition } from "@/types/projects";

type ProjectHeaderProps = {
  project: ProjectDefinition;
  headline: string;
  intro: ReactNode;
  // A few words on where the project is at, e.g. "Live, hosting this site"
  status?: string;
  github?: { href: string; label: string };
  // The pill at the top, like "Public" on a GitHub repo
  label?: string;
};

// The card at the top of a project page: label, status, headline, intro and
// tags. The tags come from src/config/projects.ts.
export default function ProjectHeader({
  project,
  headline,
  intro,
  status,
  github,
  label = "Personal project",
}: ProjectHeaderProps) {
  return (
    <header className="rounded-card bg-panel/50 p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-4">
          <span className="rounded-full border border-white/20 px-2 text-xs text-text-secondary">
            {label}
          </span>
          {status && (
            <span className="flex items-center gap-2 text-sm text-text-secondary">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-emerald-400"
              />
              {status}
            </span>
          )}
        </div>

        {github && (
          <a
            href={github.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-button bg-action px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <GithubIcon aria-hidden="true" className="h-4 w-4" />
            <span>{github.label}</span>
          </a>
        )}
      </div>

      <h1 className="mt-6 max-w-4xl text-4xl font-bold text-text-primary sm:text-5xl">
        {headline}
      </h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-text-secondary">
        {intro}
      </p>

      <TagDots tags={project.tags} className="mt-5" />
    </header>
  );
}
