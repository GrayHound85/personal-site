import type { Metadata } from "next";

import PortfolioLayout from "@c/layout/PortfolioLayout";
import ProfileCard from "@c/sections/porfolio/ProfileCard";
import ProjectRow from "@c/sections/projects/ProjectRow";
import PathNav from "@c/ui/PathNav";
import RepoPanel from "@c/ui/RepoPanel";
import BookIcon from "@c/icons/BooksIcon";

import { projects } from "@/config/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Software and infrastructure projects by Oliver Norrie, a Computer Science student at the University of Edinburgh.",
};

export default function ProjectsPage() {
  return (
    <PortfolioLayout
      profile={<ProfileCard />}
      hideProfileOnMobile
      navigation={
        <PathNav
          type="top"
          segments={[{ label: "home", href: "/" }, { label: "projects" }]}
        />
      }
    >
      <RepoPanel
        id="projects"
        icon={BookIcon}
        title="Projects"
        action={
          <span className="font-mono text-xs text-text-secondary">
            {projects.length} projects
          </span>
        }
      >
        <ul>
          {projects.map((project) => (
            <ProjectRow key={project.slug} project={project} />
          ))}
        </ul>
      </RepoPanel>
    </PortfolioLayout>
  );
}
