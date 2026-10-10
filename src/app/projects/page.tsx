import BackgroundLayout from "@/components/layout/BackgroundLayout";
import ProjectCard from "@/components/sections/porfolio/ProjectCard";
import Card from "@/components/ui/Card";
import { projects } from "@/config/projects";

function getPlaceholderVisibility(index: number) {
  if (index === 0) return "";
  if (index <= 5) return "hidden sm:block";
  if (index <= 9) return "hidden lg:block";
  if (index <= 13) return "hidden xl:block";
  return "hidden";
}

export default function ProjectsPage() {
  return (
    <BackgroundLayout background="plain">
      <main className="flex h-screen min-h-0 w-full flex-col items-center gap-3 overflow-hidden p-4 sm:gap-4 sm:p-8">
        <div className="w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-text-primary">Projects</h1>
        </div>
        <Card className="scrollbar-hidden min-h-0 w-full max-w-screen-2xl flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Object.entries(projects).map(([id, project], index) => (
              <ProjectCard
                key={id}
                link={project.link}
                image={project.image}
                title={project.title}
                eager={index === 0}
              />
            ))}
            {Array.from({ length: 14 }, (_, index) => (
              <div
                key={`future-project-${index}`}
                aria-hidden="true"
                className={`aspect-10/7 w-full max-w-100 rounded-card_inner bg-white/[0.02] ${getPlaceholderVisibility(index)}`}
              />
            ))}
          </div>
        </Card>
      </main>
    </BackgroundLayout>
  );
}
