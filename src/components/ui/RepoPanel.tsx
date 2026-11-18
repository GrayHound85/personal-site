import type { ComponentType, ReactNode, SVGProps } from "react";
import { twMerge } from "tailwind-merge";

type RepoPanelProps = {
  title: string;
  id?: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  // Shown on the right of the header strip, e.g. a button or a count
  action?: ReactNode;
  className?: string;
  children: ReactNode;
};

// A panel with a header strip, like the boxes on a GitHub repo page
// (README.md, Pinned, Commits...).
export default function RepoPanel({
  title,
  id,
  icon: Icon,
  action,
  className,
  children,
}: RepoPanelProps) {
  return (
    <section
      id={id}
      className={twMerge(
        `
                relative
                z-0
                scroll-mt-28
                overflow-hidden

                rounded-card
                border
                border-transparent
                bg-panel/50
            `,
        className,
      )}
    >
      <div className="flex min-h-14 items-center justify-between gap-4 border-b border-white/10 px-5 py-3 lg:px-8">
        <h2 className="flex min-w-0 items-center gap-2 font-mono text-sm font-semibold text-text-secondary">
          {Icon && <Icon aria-hidden="true" className="h-4 w-4 shrink-0" />}
          <span className="truncate">{title}</span>
        </h2>
        {action}
      </div>

      <div className="p-5 lg:p-8">{children}</div>
    </section>
  );
}
