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
      "A server I built myself, in a 3D-printed case I designed, that hosts this site and my other projects.",
    tags: ["Ubuntu Server", "Docker", "Cloudflare Tunnels"],
    year: 2026,
    featured: true,
  },
  {
    slug: "personal-site",
    title: "Personal Site",
    summary:
      "This website: a public portfolio, plus private tools behind a login that I'm building for myself.",
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
    year: 2026,
    featured: true,
  },
];

export function getProject(slug: string) {
  const project = projects.find((project) => project.slug === slug);

  if (!project) {
    throw new Error(`No project with slug "${slug}" in src/config/projects.ts`);
  }

  return project;
}
