import type { ComponentType, ReactNode, SVGProps } from "react";

import HeroPanel from "@c/sections/porfolio/HeroPanel";

type RepoPanelProps = {
  id: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  action?: ReactNode;
  children: ReactNode;
};

// A HeroPanel with a header strip, like the boxes on a GitHub repo page
// (README.md, Pinned, Commits...).
export default function RepoPanel({
  id,
  icon: Icon,
  title,
  action,
  children,
}: RepoPanelProps) {
  return (
    <HeroPanel id={id} className="gap-0 overflow-hidden p-0">
      <div className="flex min-h-14 items-center justify-between gap-4 border-b border-white/10 px-5 py-3 lg:px-8">
        <h2 className="flex items-center gap-2 font-mono text-sm font-semibold text-text-secondary">
          <Icon aria-hidden="true" className="h-4 w-4" />
          {title}
        </h2>
        {action}
      </div>

      <div className="p-5 lg:p-8">{children}</div>
    </HeroPanel>
  );
}
