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
    image: "/projects/homelab_fusion_assembly.png",
    link: "/projects/homelab",
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
