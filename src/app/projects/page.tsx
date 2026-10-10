import BackgroundLayout from "@/components/layout/BackgroundLayout";
import ProjectsGrid from "@/components/sections/projects/ProjectsGrid";
import { projects } from "@/config/projects";
import Link from "next/link";

const projectItems = Object.entries(projects).map(([id, project], index) => ({
  id,
  ...project,
  eager: index === 0,
}));

export default function ProjectsPage() {
  return (
    <BackgroundLayout background="plain">
      <main className="flex h-screen min-h-0 w-full flex-col items-center gap-3 overflow-hidden p-4 sm:gap-4 sm:p-8">
        <div className="w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="mb-2 inline-flex text-sm text-text-secondary transition-colors hover:text-primary"
          >
            Back to home
          </Link>
          <h1 className="text-3xl font-bold text-text-primary">Projects</h1>
        </div>
        <ProjectsGrid projects={projectItems} />
      </main>
    </BackgroundLayout>
  );
}
