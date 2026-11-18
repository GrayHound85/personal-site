import Link from "next/link";
import type { ReactNode } from "react";

import BackgroundLayout from "./BackgroundLayout";
import ProjectContentsNav, {
  type ProjectSectionLink,
} from "@c/sections/projects/ProjectContentsNav";
import ProjectFact from "@c/sections/projects/ProjectFact";
import Card from "@c/ui/Card";
import GithubIcon from "@c/icons/GithubIcon";

type ProjectPageLayoutProps = {
  headline: string;
  intro: ReactNode;
  facts: { label: string; value: string }[];
  github: { href: string; label: string };
  sections: ProjectSectionLink[];
  label?: string;
  children: ReactNode;
};

// The shared shell for every page under /projects/<slug>: back link, header
// card with the headline and key facts, and the "On this page" contents nav.
// The write-up itself goes in children, one <section> per entry in sections.
export default function ProjectPageLayout({
  headline,
  intro,
  facts,
  github,
  sections,
  label = "Personal project",
  children,
}: ProjectPageLayoutProps) {
  return (
    <BackgroundLayout background="plain">
      <div className="mx-auto w-full max-w-7xl px-4 pt-16 pb-6 sm:px-6 lg:px-8 lg:py-10">
        <ProjectContentsNav
          backHref="/projects"
          sections={sections}
          intro={
            <>
              <Link
                href="/projects"
                className="hidden text-sm text-text-secondary transition-colors hover:text-primary lg:inline-flex"
              >
                Back to projects
              </Link>

              <Card className="mt-5 border-none bg-panel/50 p-5 sm:p-7">
                <header>
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm font-semibold uppercase text-primary">
                      {label}
                    </p>
                    <a
                      href={github.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex shrink-0 items-center gap-2 rounded-button bg-action px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      <GithubIcon aria-hidden="true" className="h-4 w-4" />
                      <span>{github.label}</span>
                    </a>
                  </div>
                  <h1 className="max-w-4xl text-4xl font-bold text-text-primary sm:text-5xl">
                    {headline}
                  </h1>
                  <p className="mt-5 max-w-3xl text-lg leading-8 text-text-secondary">
                    {intro}
                  </p>

                  <dl className="mt-8 grid gap-5 sm:grid-cols-3">
                    {facts.map((fact) => (
                      <ProjectFact key={fact.label} {...fact} />
                    ))}
                  </dl>
                </header>
              </Card>
            </>
          }
        >
          <article className="min-w-0 max-w-4xl space-y-12">{children}</article>
        </ProjectContentsNav>
      </div>
    </BackgroundLayout>
  );
}
