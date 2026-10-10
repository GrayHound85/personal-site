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
  title: string;
  link: string;
  image?: string;
  icon?: ProjectCardIconOptions;
};
