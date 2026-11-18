import type { ReactNode } from "react";

import BackgroundLayout from "./BackgroundLayout";
import ProjectContentsNav, {
  type ProjectSectionLink,
} from "@c/sections/projects/ProjectContentsNav";
import ProjectContentsMenu from "@c/sections/projects/ProjectContentsMenu";
import PathNav from "@c/ui/PathNav";
import type { ProjectDefinition } from "@/types/projects";

type ProjectPageLayoutProps = {
  project: ProjectDefinition;
  // Usually a <ProjectHeader />
  header: ReactNode;
  // One entry per <ProjectSection>, used for the "On this page" nav
  sections: ProjectSectionLink[];
  children: ReactNode;
};

// The page shell for /projects/<slug>: background, the home / projects /
// <slug> nav, header card on top and the contents nav beside the write-up.
// The pieces that go inside it are in src/components/sections/projects/.
export default function ProjectPageLayout({
  project,
  header,
  sections,
  children,
}: ProjectPageLayoutProps) {
  return (
    <BackgroundLayout background="plain">
      <div className="mx-auto w-full max-w-7xl px-4 pb-6 sm:px-6 lg:px-8 lg:pb-10">
        {/*
          Sticks to the top like the home page nav. Less padding on the right
          on mobile so the path fits next to the contents button.
        */}
        <PathNav
          type="top"
          className="sticky top-0 z-30 mb-8 pr-3 sm:pr-7"
          segments={[
            { label: "home", href: "/" },
            { label: "projects", href: "/projects" },
            { label: project.slug },
          ]}
        >
          <ProjectContentsMenu sections={sections} />
        </PathNav>

        <ProjectContentsNav sections={sections} intro={header}>
          <article className="space-y-8">{children}</article>
        </ProjectContentsNav>
      </div>
    </BackgroundLayout>
  );
}
