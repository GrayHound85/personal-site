"use client";

import { useState } from "react";
import Link from "next/link";
import type { ReactNode } from "react";

import ArrowIcon from "@/components/icons/ArrowIcon";

export type ProjectSectionLink = {
  id: string;
  title: string;
};

type ProjectContentsNavProps = {
  backHref: string;
  sections: ProjectSectionLink[];
  intro: ReactNode;
  children: ReactNode;
};

export default function ProjectContentsNav({
  backHref,
  sections,
  intro,
  children,
}: ProjectContentsNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="fixed left-4 top-4 z-50 lg:hidden">
        <button
          type="button"
          aria-label={
            mobileOpen ? "Close project navigation" : "Open project navigation"
          }
          aria-expanded={mobileOpen}
          aria-controls="project-mobile-menu"
          onClick={() => setMobileOpen((open) => !open)}
          className="rounded-md p-2 text-text-primary transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <svg
            aria-hidden="true"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>

      <div
        className={`transition-opacity duration-300 ease-out motion-reduce:transition-none lg:opacity-100 lg:transition-none ${mobileOpen ? "pointer-events-none opacity-0" : "opacity-100"}`}
      >
        {intro}
        <div className="grid w-full gap-8 py-8 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-12 lg:py-10">
          <nav
            aria-label="Project sections"
            className="hidden border-y border-border py-3 lg:sticky lg:top-8 lg:mt-1 lg:block lg:max-h-[calc(100vh-4rem)] lg:self-start lg:overflow-y-auto lg:border-y-0 lg:py-1 lg:pl-5"
          >
            <p className="text-sm font-semibold text-text-primary">
              On this page
            </p>
            <ul className="mt-3 grid gap-1">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="block rounded-button px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-primary-hover hover:text-text-primary"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0 max-w-4xl space-y-12 lg:col-start-2">
            {children}
          </div>
        </div>
      </div>

      <div
        className={`fixed bottom-3 left-0 right-3 top-0 z-40 transform transition-transform duration-300 ease-in-out motion-reduce:transition-none lg:hidden ${mobileOpen ? "translate-x-0 pointer-events-auto" : "-translate-x-full pointer-events-none"}`}
      >
        <nav
          id="project-mobile-menu"
          aria-label="Project navigation"
          className="h-full w-full overflow-y-auto rounded-r-card border border-border bg-panel px-4 pt-20 pb-4"
        >
          <Link
            href={backHref}
            onClick={() => setMobileOpen(false)}
            className="mb-4 flex items-center gap-2 px-3 py-2 text-text-primary transition-colors hover:bg-primary-hover"
          >
            <ArrowIcon direction="left" />
            <span>Back to projects</span>
          </Link>
          <ul className="space-y-1">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-primary-hover hover:text-text-primary"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
