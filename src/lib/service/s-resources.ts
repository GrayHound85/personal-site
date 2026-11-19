import {
  createCategory,
  createResource,
  createSubCategory,
  createTopic,
  getCategories,
  getSubCategories,
  getTopics,
  getResourcesByTopic,
  getResourceTypes,
} from "@l/repo/r-resources";

import type {
  ResourceNavigation,
  ResourceNavigationCategory,
  ResourceNavigationSubCategory,
  ResourceNavigationTopic,
  ResourcePageContext,
  Resource,
  ResourceType,
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

export async function getAllResourceTypes(): Promise<ResourceType[]> {
  const resourceTypesRaw = getResourceTypes();

  const resourceTypes: ResourceType[] = (await resourceTypesRaw).map(
    (resourceTypeRaw) => {
      return {
        id: resourceTypeRaw.id,
        code: resourceTypeRaw.code,
      };
    },
  );
  return resourceTypes;
}

export async function getResourcesByContext(
  context: ResourcePageContext,
  resourceTypes: ResourceType[],
): Promise<Resource[]> {
  if (!context.topic) {
    return [];
  }
  const resourcesRaw = await getResourcesByTopic(context.topic.id);

  const resources: Resource[] = resourcesRaw.map((resourceRaw) => {
    const resourceType = resourceTypes.find(
      (type) => type.id === resourceRaw.resourceTypeId,
    );

    if (!resourceType) {
      throw new Error(`Resource type ${resourceRaw.resourceTypeId} not found`);
    }

    return {
      id: resourceRaw.id,
      title: resourceRaw.title,
      type: resourceType,
      url: resourceRaw.url,
      createdAt: resourceRaw.createdAt,
      updatedAt: resourceRaw.updatedAt,
    };
  });

  return resources;
}

export function createResourceService(
  topicId: string,
  title: string,
  url: string,
  resourceTypeId: string,
) {
  return createResource(topicId, title, url, resourceTypeId);
}

//===============================================================
// Creating categories, subcategories and topics

// Thrown when a new category / subcategory / topic can't be created, e.g. the
// name is already used. The message is written to be shown to the user.
export class ResourceConflictError extends Error {}

// "Next.js" -> "nextjs", "C++" -> "cpp", "Web Development" -> "web-development"
function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/\+/g, "p")
    .replace(/#/g, "sharp")
    .replace(/\./g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Slugs are unique across a whole table, so if "basics" is taken by a topic
// in another category this one becomes "basics-2", then "basics-3"...
function uniqueSlug(name: string, takenSlugs: string[]) {
  const base = slugify(name);

  if (!base) {
    throw new ResourceConflictError(
      "Use at least one letter or number in the name.",
    );
  }

  let slug = base;
  let suffix = 2;

  while (takenSlugs.includes(slug)) {
    slug = `${base}-${suffix}`;
    suffix++;
  }

  return slug;
}

function sameName(a: string, b: string) {
  return a.trim().toLowerCase() === b.trim().toLowerCase();
}

export async function createCategoryService(name: string) {
  const categories = await getCategories();

  if (categories.some((category) => sameName(category.name, name))) {
    throw new ResourceConflictError(
      `There's already a category called "${name}".`,
    );
  }

  await createCategory(
    name,
    uniqueSlug(
      name,
      categories.map((category) => category.slug),
    ),
  );
}

export async function createSubCategoryService(
  categoryId: string,
  name: string,
) {
  const [categories, subCategories] = await Promise.all([
    getCategories(),
    getSubCategories(),
  ]);

  if (!categories.some((category) => category.id === categoryId)) {
    throw new ResourceConflictError("That category doesn't exist.");
  }

  if (
    subCategories.some(
      (subCategory) =>
        subCategory.categoryId === categoryId &&
        sameName(subCategory.name, name),
    )
  ) {
    throw new ResourceConflictError(
      `There's already a subcategory called "${name}" here.`,
    );
  }

  await createSubCategory(
    categoryId,
    name,
    uniqueSlug(
      name,
      subCategories.map((subCategory) => subCategory.slug),
    ),
  );
}

// subCategoryId null puts the topic directly inside the category
export async function createTopicService(
  categoryId: string,
  subCategoryId: string | null,
  name: string,
) {
  const [categories, subCategories, topics] = await Promise.all([
    getCategories(),
    getSubCategories(),
    getTopics(),
  ]);

  if (!categories.some((category) => category.id === categoryId)) {
    throw new ResourceConflictError("That category doesn't exist.");
  }

  if (
    subCategoryId &&
    !subCategories.some(
      (subCategory) =>
        subCategory.id === subCategoryId &&
        subCategory.categoryId === categoryId,
    )
  ) {
    throw new ResourceConflictError("That subcategory isn't in this category.");
  }

  if (
    topics.some(
      (topic) =>
        topic.categoryId === categoryId &&
        topic.subCategoryId === subCategoryId &&
        sameName(topic.name, name),
    )
  ) {
    throw new ResourceConflictError(
      `There's already a topic called "${name}" there.`,
    );
  }

  await createTopic(
    categoryId,
    subCategoryId,
    name,
    uniqueSlug(
      name,
      topics.map((topic) => topic.slug),
    ),
  );
}
