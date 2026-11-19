import type { ReactNode } from "react";

export type ProjectSectionLink = {
  id: string;
  title: string;
};

type ProjectContentsNavProps = {
  sections: ProjectSectionLink[];
  intro: ReactNode;
  children: ReactNode;
};

// The header card on top, then the write-up with a sticky "On this page" box
// beside it on large screens. On mobile the contents live in
// ProjectContentsMenu, inside the nav bar instead.
export default function ProjectContentsNav({
  sections,
  intro,
  children,
}: ProjectContentsNavProps) {
  return (
    <>
      {intro}
      <div className="grid w-full gap-8 py-8 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-12 lg:py-10">
        <nav
          aria-label="Project sections"
          className="hidden overflow-hidden rounded-card bg-panel/50 lg:sticky lg:top-28 lg:block lg:max-h-[calc(100vh-9rem)] lg:self-start lg:overflow-y-auto"
        >
          <p className="border-b border-white/10 px-5 py-3 font-mono text-sm font-semibold text-text-secondary">
            On this page
          </p>
          <ul className="grid gap-1 p-2">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="block rounded-button px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-white/10 hover:text-text-primary"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="min-w-0 space-y-12 lg:col-start-2">{children}</div>
      </div>
    </>
  );
}
