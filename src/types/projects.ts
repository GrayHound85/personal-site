export type ProjectDefinition = {
  // Folder name under src/app/projects/, the page lives at /projects/<slug>
  slug: string;
  title: string;
  // One sentence, used on project cards and as the page's meta description
  summary: string;
  tags: string[];
  year: number;
  // Pin this project on the home page
  featured: boolean;
};
