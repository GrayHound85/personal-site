import { executeDatabaseQuery, getDb } from "@d/db";
import {
  CategoryTable,
  ResourceTable,
  ResourceNotesTable,
  ResourceTypeTable,
  SubCategoryTable,
  TopicTable,
} from "@d/schema";
import { eq } from "drizzle-orm";

export function getCategories() {
  return executeDatabaseQuery(() => getDb().select().from(CategoryTable));
}

export function getSubCategories() {
  return executeDatabaseQuery(() => getDb().select().from(SubCategoryTable));
}

export function getTopics() {
  return executeDatabaseQuery(() => getDb().select().from(TopicTable));
}

export function getSubCategoriesByCategory(categoryId: string) {
  return executeDatabaseQuery(() =>
    getDb()
      .select()
      .from(SubCategoryTable)
      .where(eq(SubCategoryTable.categoryId, categoryId)),
  );
}

export function getTopicsByCategory(categoryId: string) {
  return executeDatabaseQuery(() =>
    getDb()
      .select()
      .from(TopicTable)
      .where(eq(TopicTable.categoryId, categoryId)),
  );
}

export function getTopicsBySubCategory(subCategoryId: string) {
  return executeDatabaseQuery(() =>
    getDb()
      .select()
      .from(TopicTable)
      .where(eq(TopicTable.subCategoryId, subCategoryId)),
  );
}

export function getTopicBySlug(slug: string) {
  return executeDatabaseQuery(() =>
    getDb().select().from(TopicTable).where(eq(TopicTable.slug, slug)),
  );
}

export function getResources() {
  return executeDatabaseQuery(() => getDb().select().from(ResourceTable));
}

export function getResourcesByTopic(topicId: string) {
  return executeDatabaseQuery(() =>
    getDb()
      .select()
      .from(ResourceTable)
      .where(eq(ResourceTable.topicId, topicId)),
  );
}

export function getResource(resourceId: string) {
  return executeDatabaseQuery(() =>
    getDb()
      .select()
      .from(ResourceTable)
      .where(eq(ResourceTable.id, resourceId)),
  );
}

export function getResourceTypes() {
  return executeDatabaseQuery(() => getDb().select().from(ResourceTypeTable));
}

export function getResourceNotes(resourceID: string) {
  return executeDatabaseQuery(() =>
    getDb()
      .select()
      .from(ResourceNotesTable)
      .where(eq(ResourceNotesTable.resourceId, resourceID)),
  );
}

//===============================================================

export function createResource(
  topicId: string,
  title: string,
  url: string,
  resourceTypeId: string,
) {
  return executeDatabaseQuery(() =>
    getDb()
      .insert(ResourceTable)
      .values({
        topicId,
        title,
        url,
        resourceTypeId,
      })
      .returning(),
  );
}

export function createCategory(name: string, slug: string) {
  return executeDatabaseQuery(() =>
    getDb().insert(CategoryTable).values({ name, slug }).returning(),
  );
}

export function createSubCategory(
  categoryId: string,
  name: string,
  slug: string,
) {
  return executeDatabaseQuery(() =>
    getDb()
      .insert(SubCategoryTable)
      .values({ categoryId, name, slug })
      .returning(),
  );
}

// subCategoryId null puts the topic directly inside the category
export function createTopic(
  categoryId: string,
  subCategoryId: string | null,
  name: string,
  slug: string,
) {
  return executeDatabaseQuery(() =>
    getDb()
      .insert(TopicTable)
      .values({ categoryId, subCategoryId, name, slug })
      .returning(),
  );
}

//===============================================================
// Updating and deleting. Slugs are left alone on rename so URLs don't change.

export function updateCategory(id: string, name: string) {
  return executeDatabaseQuery(() =>
    getDb().update(CategoryTable).set({ name }).where(eq(CategoryTable.id, id)),
  );
}

export function deleteCategory(id: string) {
  return executeDatabaseQuery(() =>
    getDb().delete(CategoryTable).where(eq(CategoryTable.id, id)),
  );
}

export function updateSubCategory(id: string, name: string) {
  return executeDatabaseQuery(() =>
    getDb()
      .update(SubCategoryTable)
      .set({ name })
      .where(eq(SubCategoryTable.id, id)),
  );
}

export function deleteSubCategory(id: string) {
  return executeDatabaseQuery(() =>
    getDb().delete(SubCategoryTable).where(eq(SubCategoryTable.id, id)),
  );
}

// subCategoryId null moves the topic directly into its category
export function updateTopic(
  id: string,
  name: string,
  subCategoryId: string | null,
) {
  return executeDatabaseQuery(() =>
    getDb()
      .update(TopicTable)
      .set({ name, subCategoryId })
      .where(eq(TopicTable.id, id)),
  );
}

export function deleteTopic(id: string) {
  return executeDatabaseQuery(() =>
    getDb().delete(TopicTable).where(eq(TopicTable.id, id)),
  );
}

export function updateResource(
  id: string,
  title: string,
  url: string,
  resourceTypeId: string,
) {
  return executeDatabaseQuery(() =>
    getDb()
      .update(ResourceTable)
      .set({ title, url, resourceTypeId, updatedAt: new Date() })
      .where(eq(ResourceTable.id, id)),
  );
}

// The resource's notes are removed with it (onDelete cascade)
export function deleteResource(id: string) {
  return executeDatabaseQuery(() =>
    getDb().delete(ResourceTable).where(eq(ResourceTable.id, id)),
  );
}
