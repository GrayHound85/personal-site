"use client";

import { useState } from "react";

export type ProjectSectionLink = {
  id: string;
  title: string;
};

type ProjectContentsNavProps = {
  sections: ProjectSectionLink[];
};

export default function ProjectContentsNav({
  sections,
}: ProjectContentsNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      aria-label="Project sections"
      className="border-y border-border py-3 lg:sticky lg:top-8 lg:mt-1 lg:max-h-[calc(100vh-4rem)] lg:self-start lg:overflow-y-auto lg:border-y-0 lg:border-l lg:py-1 lg:pl-5"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-text-primary">On this page</p>
        <button
          type="button"
          aria-expanded={mobileOpen}
          aria-controls="project-contents-list"
          onClick={() => setMobileOpen((open) => !open)}
          className="rounded-button px-3 py-1 text-sm text-text-secondary hover:bg-primary-hover hover:text-text-primary lg:hidden"
        >
          {mobileOpen ? "Close -" : "Open +"}
        </button>
      </div>
      <ul
        id="project-contents-list"
        className={`${mobileOpen ? "mt-2 grid" : "hidden"} gap-1 lg:mt-3 lg:grid`}
      >
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              onClick={() => setMobileOpen(false)}
              className="block rounded-button px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-primary-hover hover:text-text-primary"
            >
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
