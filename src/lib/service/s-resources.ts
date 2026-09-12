import {
  getCategories,
  getSubCategories,
  getTopics,
} from "@l/repo/r-resources";

import type {
  ResourceNavigation,
  ResourceNavigationCategory,
  ResourceNavigationSubCategory,
  ResourceNavigationTopic,
  ResourcePageContext,
} from "@/types/resources";

export async function getResourceNavigation(): Promise<ResourceNavigation> {
  const [categories, subCategories, topics] = await Promise.all([
    getCategories(),
    getSubCategories(),
    getTopics(),
  ]);

  const navigation: ResourceNavigationCategory[] = categories.map(
    (category) => {
      const categoryTopics: ResourceNavigationTopic[] = topics
        .filter(
          (topic) =>
            topic.categoryId === category.id && topic.subCategoryId === null,
        )
        .map((topic) => ({
          id: topic.id,
          name: topic.name,
          slug: topic.slug,
        }));

      const categorySubCategories: ResourceNavigationSubCategory[] =
        subCategories
          .filter((subCategory) => subCategory.categoryId === category.id)
          .map((subCategory) => {
            const subCategoryTopics: ResourceNavigationTopic[] = topics
              .filter((topic) => topic.subCategoryId === subCategory.id)
              .map((topic) => ({
                id: topic.id,
                name: topic.name,
                slug: topic.slug,
              }));

            return {
              id: subCategory.id,
              name: subCategory.name,
              slug: subCategory.slug,
              topics: subCategoryTopics,
            };
          });

      return {
        id: category.id,
        name: category.name,
        slug: category.slug,
        topics: categoryTopics,
        subCategories: categorySubCategories,
      };
    },
  );

  return navigation;
}

export async function getResourcePageContext(
  slug: string[] | undefined,
  navigation?: ResourceNavigation,
): Promise<ResourcePageContext> {
  const resourceNavigation = navigation ?? (await getResourceNavigation());

  if (!slug || slug.length === 0) {
    return {
      category: null,
      subCategory: null,
      topic: null,
    };
  }

  const category = resourceNavigation.find(
    (category) => category.slug === slug[0],
  );

  if (!category) {
    return {
      category: null,
      subCategory: null,
      topic: null,
    };
  }

  if (slug.length === 1) {
    return {
      category,
      subCategory: null,
      topic: null,
    };
  }

  const topicSlug = slug[1];

  const categoryTopic = category.topics.find(
    (topic) => topic.slug === topicSlug,
  );

  if (categoryTopic) {
    return {
      category,
      subCategory: null,
      topic: categoryTopic,
    };
  }

  for (const subCategory of category.subCategories) {
    const subCategoryTopic = subCategory.topics.find(
      (topic) => topic.slug === topicSlug,
    );

    if (subCategoryTopic) {
      return {
        category,
        subCategory,
        topic: subCategoryTopic,
      };
    }
  }

  return {
    category,
    subCategory: null,
    topic: null,
  };
}
