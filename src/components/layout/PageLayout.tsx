import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import BackgroundLayout from "./BackgroundLayout";
import PathNav, { type PathSegment } from "@c/ui/PathNav";

type PageLayoutProps = {
  // The path shown in the nav bar, e.g. home / dashboard / career
  segments: PathSegment[];
  // Extra controls on the right of the nav bar (mobile menus etc.)
  navExtra?: ReactNode;
  // Keep the page in a centred max-w-7xl column (project pages) instead of
  // using the full width of the screen (private pages)
  contained?: boolean;
  // Classes for the content area under the nav
  className?: string;
  children: ReactNode;
};

// The shell for pages without the profile sidebar: background, a sticky
// PathNav along the top and the page content underneath.
export default function PageLayout({
  segments,
  navExtra,
  contained = false,
  className,
  children,
}: PageLayoutProps) {
  return (
    <BackgroundLayout background="plain">
      <div
        className={`flex min-h-screen w-full flex-col px-4 pb-6 sm:px-6 lg:px-8 lg:pb-10 ${contained ? "mx-auto max-w-7xl" : ""}`}
      >
        {/* Less padding on the right on mobile when there's a button there */}
        <PathNav
          type="top"
          className={`sticky top-0 z-30 mb-8 ${navExtra ? "pr-3 sm:pr-7" : ""}`}
          segments={segments}
        >
          {navExtra}
        </PathNav>

        <div className={twMerge("flex-1", className)}>{children}</div>
      </div>
    </BackgroundLayout>
  );
}
