import type { Metadata } from "next";

import PageLayout from "@c/layout/PageLayout";
import WorkspaceCard, {
  type WorkspaceCardProps,
} from "@c/sections/workspace/WorkspaceCard";
import RepoPanel from "@c/ui/RepoPanel";

export const metadata: Metadata = {
  title: "Dashboard",
};

// Temporary: the areas will get proper overviews once their tools exist
const areas: WorkspaceCardProps[] = [
  {
    href: "/career",
    name: "career",
    description:
      "Study and career tools. The resource library works, the rest are still scaffolds.",
  },
  {
    href: "/media",
    name: "media",
    description: "A media server for digital copies of physical media I own.",
  },
  {
    href: "/finance",
    name: "finance",
    description: "Personal finance tracking, and later market analysis.",
  },
];

export default function DashboardPage() {
  return (
    <PageLayout
      segments={[{ label: "home", href: "/" }, { label: "dashboard" }]}
    >
      <RepoPanel
        title="workspace"
        action={
          <span className="font-mono text-xs text-text-secondary">
            {areas.length} areas
          </span>
        }
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {areas.map((area) => (
            <WorkspaceCard key={area.href} {...area} />
          ))}
        </div>
      </RepoPanel>
    </PageLayout>
  );
}
