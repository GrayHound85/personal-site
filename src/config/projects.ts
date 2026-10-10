import type { ProjectDefinition } from "@/types/projects";

export const projects = {
  homelab: {
    title: "HomeLab",
    icon: {
      name: "ServerIcon",
      foregroundColor: "#85afd8",
      backgroundColor: "",
      invert: false,
    },
    link: "/projects",
  },

  personalSite: {
    title: "Personal Site",
    icon: {
      name: "PersonalSiteIcon",
      foregroundColor: "#85afd8",
      backgroundColor: "",
      invert: false,
    },
    link: "/projects/personal-site",
  },
} satisfies Record<string, ProjectDefinition>;
