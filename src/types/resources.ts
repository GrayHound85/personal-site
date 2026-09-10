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

export type ResourceNavigation = ResourceNavigationCategory[];
