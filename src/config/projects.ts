import type { ProjectDefinition } from "@/types/projects";

/*
  Every project on the site. To add one:
    1. Add an entry here (the order here is the order everywhere)
    2. Create src/app/projects/<slug>/page.tsx using ProjectPageLayout

  It then shows up on /projects and in the sitemap automatically, and on the
  home page if `featured` is true.
*/
export const projects: ProjectDefinition[] = [
  {
    slug: "homelab",
    title: "HomeLab",
    summary:
      "A self-built Linux server that hosts this site and my other projects, using Docker and Cloudflare Tunnels.",
    tags: ["Infrastructure", "Linux", "Docker"],
    year: 2026,
    featured: true,
    image: "/projects/homelab_fusion_assembly.png",
    icon: {
      name: "ServerIcon",
      foregroundColor: "#85afd8",
      backgroundColor: "",
      invert: false,
    },
  },
  {
    slug: "personal-site",
    title: "Personal Site",
    summary:
      "This website: a public portfolio plus private tools behind a login, built with Next.js and PostgreSQL.",
    tags: ["Web", "TypeScript", "PostgreSQL"],
    year: 2026,
    featured: true,
    icon: {
      name: "PersonalSiteIcon",
      foregroundColor: "#85afd8",
      backgroundColor: "",
      invert: false,
    },
  },
];

export function getProject(slug: string) {
  const project = projects.find((project) => project.slug === slug);

  if (!project) {
    throw new Error(`No project with slug "${slug}" in src/config/projects.ts`);
  }

  return project;
}
