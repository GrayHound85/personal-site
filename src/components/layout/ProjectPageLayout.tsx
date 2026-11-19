import type { ReactNode } from "react";

import PageLayout from "./PageLayout";
import ProjectContentsNav, {
  type ProjectSectionLink,
} from "@c/sections/projects/ProjectContentsNav";
import ProjectContentsMenu from "@c/sections/projects/ProjectContentsMenu";
import type { ProjectDefinition } from "@/types/projects";

type ProjectPageLayoutProps = {
  project: ProjectDefinition;
  // Usually a <ProjectHeader />
  header: ReactNode;
  // One entry per <ProjectSection>, used for the "On this page" nav
  sections: ProjectSectionLink[];
  children: ReactNode;
};

// The page shell for /projects/<slug>: the home / projects / <slug> nav,
// header card on top and the contents nav beside the write-up.
// The pieces that go inside it are in src/components/sections/projects/.
export default function ProjectPageLayout({
  project,
  header,
  sections,
  children,
}: ProjectPageLayoutProps) {
  return (
    <PageLayout
      segments={[
        { label: "home", href: "/" },
        { label: "projects", href: "/projects" },
        { label: project.slug },
      ]}
      navExtra={<ProjectContentsMenu sections={sections} />}
      contained
    >
      <ProjectContentsNav sections={sections} intro={header}>
        <article className="space-y-8">{children}</article>
      </ProjectContentsNav>
    </PageLayout>
  );
}
