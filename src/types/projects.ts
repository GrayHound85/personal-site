export type ProjectIconName =
  | "books"
  | "copy"
  | "docs"
  | "github"
  | "leetcode"
  | "linkedin"
  | "PersonalSiteIcon"
  | "ServerIcon"
  | "tick"
  | "video"
  | "web"
  | "arrow";

export type ProjectCardIconOptions = {
  name: ProjectIconName;
  foregroundColor: string;
  backgroundColor: string;
  invert?: boolean;
};

export type ProjectDefinition = {
  // Folder name under src/app/projects/, the page lives at /projects/<slug>
  slug: string;
  title: string;
  // One sentence, used on the home page and as the page's meta description
  summary: string;
  tags: string[];
  year: number;
  // Show this project on the home page
  featured: boolean;
  image?: string;
  icon?: ProjectCardIconOptions;
};
