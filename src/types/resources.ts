export type ResourceNavigationTopic = {
  id: string;
  name: string;
  slug: string;
};

export type ResourceNavigationSubCategory = {
  id: string;
  name: string;
  slug: string;
  topics: ResourceNavigationTopic[];
};

export type ResourceNavigationCategory = {
  id: string;
  name: string;
  slug: string;
  topics: ResourceNavigationTopic[];
  subCategories: ResourceNavigationSubCategory[];
};

export type ResourceType = "video" | "book" | "website" | "docs";

export type Resource = {
  id: string;
  title: string;
  type: ResourceType;
  url: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ResourceNavigation = ResourceNavigationCategory[];

export type ResourcePageContext = {
  category: ResourceNavigationCategory | null;
  subCategory: ResourceNavigationSubCategory | null;
  topic: ResourceNavigationTopic | null;
};
