"use client";

import { useEffect, useState } from "react";

import type { ProjectSectionLink } from "./ProjectContentsNav";

type ProjectContentsMenuProps = {
  sections: ProjectSectionLink[];
};

// Mobile only: a button on the right of the nav bar that drops the
// "On this page" list down underneath it. Sits inside PathNav, which is
// sticky, so the panel is positioned against the nav bar.
export default function ProjectContentsMenu({
  sections,
}: ProjectContentsMenuProps) {
  const [open, setOpen] = useState(false);

  // Close with the Escape key
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <div className="ml-auto shrink-0 font-sans text-base lg:hidden">
      {/* Invisible layer behind the menu, tapping anywhere outside closes it */}
      {open && (
        <div
          aria-hidden="true"
          className="fixed inset-0"
          onClick={() => setOpen(false)}
        />
      )}

      <button
        type="button"
        aria-label={open ? "Close contents" : "Open contents"}
        aria-expanded={open}
        aria-controls="project-contents-menu"
        onClick={() => setOpen(!open)}
        className="relative flex h-9 w-9 items-center justify-center rounded-button bg-white/15 transition-colors hover:bg-white/25"
      >
        <svg
          aria-hidden="true"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            d={open ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h10"}
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
        </svg>
      </button>

      {/* Solid version of --color-panel so the page doesn't show through */}
      <div
        id="project-contents-menu"
        className={`
                    absolute
                    inset-x-0
                    top-full
                    mt-3
                    overflow-hidden

                    rounded-card
                    border
                    border-white/10
                    bg-[#071421]
                    shadow-card

                    transition-all
                    duration-200
                    motion-reduce:transition-none

                    ${open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"}
                `}
      >
        <p className="border-b border-white/10 px-5 py-3 font-mono text-sm font-semibold text-text-secondary">
          On this page
        </p>
        <ul className="grid gap-1 p-2">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between gap-4 rounded-button px-3 py-3 text-text-secondary transition-colors hover:bg-white/10 hover:text-text-primary"
              >
                {section.title}
                <span className="font-mono text-xs opacity-60">
                  {section.id}.md
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
