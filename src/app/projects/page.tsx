import BackgroundLayout from "@/components/layout/BackgroundLayout";
import ProjectCard from "@/components/sections/porfolio/ProjectCard";
import { projects } from "@/config/projects";

export default function ProjectsPage() {
  return (
    <BackgroundLayout background="subtle">
      <main className="flex w-full flex-col items-center gap-8 p-8">
        <h2 className="font-bold text-3xl text-text-secondary">Projects</h2>
        <div className="grid w-full max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {Object.entries(projects).map(([id, project]) => (
            <ProjectCard
              key={id}
              link={project.link}
              image={project.image}
              title={project.title}
            />
          ))}
        </div>
      </main>
    </BackgroundLayout>
  );
}
