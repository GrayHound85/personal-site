import type { ReactNode } from "react";

import DocsIcon from "@c/icons/DocsIcon";

type ProjectSectionProps = {
  // Must match an id in the page's `sections` list for the contents nav
  id: string;
  title: string;
  // Small text on the right of the header strip, e.g. "Under the hood"
  label?: string;
  children: ReactNode;
};

// One section of a project write-up, shown like a markdown file on GitHub.
// Plain <p>, <strong> and <a> inside are styled for you, so the children can
// just be text and the other Project* components.
export default function ProjectSection({
  id,
  title,
  label,
  children,
}: ProjectSectionProps) {
  return (
    <section
      id={id}
      className="reveal-on-scroll scroll-mt-28 overflow-hidden rounded-card border border-transparent bg-panel/50"
    >
      <div className="flex min-h-12 items-center justify-between gap-4 border-b border-white/10 px-5 py-3 sm:px-7">
        <p className="flex items-center gap-2 font-mono text-sm font-semibold text-text-secondary">
          <DocsIcon aria-hidden="true" className="h-4 w-4" />
          {id}.md
        </p>
        {label && (
          <p className="hidden font-mono text-xs text-text-secondary sm:block">
            {label}
          </p>
        )}
      </div>

      <div className="p-5 sm:p-7">
        <h2 className="border-b border-white/10 pb-3 text-2xl font-bold text-text-primary">
          {title}
        </h2>

        <div
          className="
                        mt-5
                        space-y-5
                        leading-7
                        text-text-secondary

                        [&_strong]:text-text-primary
                        [&_a]:text-primary
                        [&_a]:underline
                        [&_a]:underline-offset-4
                    "
        >
          {children}
        </div>
      </div>
    </section>
  );
}
