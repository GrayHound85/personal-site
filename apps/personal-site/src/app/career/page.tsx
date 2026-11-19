import type { Metadata } from "next";

import PageLayout from "@c/layout/PageLayout";
import WorkspaceCard, {
  type WorkspaceCardProps,
} from "@c/sections/workspace/WorkspaceCard";
import RepoPanel from "@repo/ui/components/RepoPanel";

export const metadata: Metadata = {
  title: "Career",
};

// Temporary: grouped list of the career tools until they're built out
const groups: { title: string; tools: WorkspaceCardProps[] }[] = [
  {
    title: "career",
    tools: [
      {
        href: "/career/opportunities",
        name: "opportunities",
        description: "Jobs, internships and placements I'm tracking.",
        planned: true,
      },
      {
        href: "/career/companies",
        name: "companies",
        description: "Companies I'm interested in and notes on them.",
        planned: true,
      },
      {
        href: "/career/networking",
        name: "networking",
        description: "People I've met and follow-ups.",
        planned: true,
      },
    ],
  },
  {
    title: "learning",
    tools: [
      {
        href: "/career/resources",
        name: "resources",
        description:
          "Library of learning resources, by category, subcategory and topic.",
      },
      {
        href: "/career/roadmaps",
        name: "roadmaps",
        description: "Learning paths for the areas I want to get into.",
        planned: true,
      },
      {
        href: "/career/reading",
        name: "reading",
        description: "Books and articles, read and to read.",
        planned: true,
      },
      {
        href: "/career/skills",
        name: "skills",
        description: "Skills I'm building and where I'm at with them.",
        planned: true,
      },
      {
        href: "/career/certification",
        name: "certifications",
        description: "Certifications done and planned.",
        planned: true,
      },
    ],
  },
  {
    title: "work",
    tools: [
      {
        href: "/career/projects",
        name: "projects",
        description: "Project ideas and progress.",
        planned: true,
      },
      {
        href: "/career/tasks",
        name: "tasks",
        description: "To-dos across everything above.",
        planned: true,
      },
      {
        href: "/career/review",
        name: "review",
        description: "Regular look-backs on how things are going.",
        planned: true,
      },
    ],
  },
];

export default function CareerPage() {
  return (
    <PageLayout
      segments={[
        { label: "home", href: "/" },
        { label: "dashboard", href: "/dashboard" },
        { label: "career" },
      ]}
      className="space-y-6"
    >
      {groups.map((group) => (
        <RepoPanel
          key={group.title}
          title={group.title}
          action={
            <span className="font-mono text-xs text-text-secondary">
              {group.tools.length} tools
            </span>
          }
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {group.tools.map((tool) => (
              <WorkspaceCard key={tool.href} {...tool} />
            ))}
          </div>
        </RepoPanel>
      ))}
    </PageLayout>
  );
}
