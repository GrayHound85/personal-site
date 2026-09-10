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
