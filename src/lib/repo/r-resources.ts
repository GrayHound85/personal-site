import { db, executeDatabaseQuery } from "@d/db";
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
  return executeDatabaseQuery(() => db.select().from(CategoryTable));
}

export function getSubCategories() {
  return executeDatabaseQuery(() => db.select().from(SubCategoryTable));
}

export function getTopics() {
  return executeDatabaseQuery(() => db.select().from(TopicTable));
}

export function getSubCategoriesByCategory(categoryId: string) {
  return executeDatabaseQuery(() =>
    db
      .select()
      .from(SubCategoryTable)
      .where(eq(SubCategoryTable.categoryId, categoryId)),
  );
}

export function getTopicsByCategory(categoryId: string) {
  return executeDatabaseQuery(() =>
    db.select().from(TopicTable).where(eq(TopicTable.categoryId, categoryId)),
  );
}

export function getTopicsBySubCategory(subCategoryId: string) {
  return executeDatabaseQuery(() =>
    db
      .select()
      .from(TopicTable)
      .where(eq(TopicTable.subCategoryId, subCategoryId)),
  );
}

export function getTopicBySlug(slug: string) {
  return executeDatabaseQuery(() =>
    db.select().from(TopicTable).where(eq(TopicTable.slug, slug)),
  );
}

export function getResources() {
  return executeDatabaseQuery(() => db.select().from(ResourceTable));
}

export function getResourcesByTopic(topicId: string) {
  return executeDatabaseQuery(() =>
    db.select().from(ResourceTable).where(eq(ResourceTable.topicId, topicId)),
  );
}

export function getResource(resourceId: string) {
  return executeDatabaseQuery(() =>
    db.select().from(ResourceTable).where(eq(ResourceTable.id, resourceId)),
  );
}

export function getResourceTypes() {
  return executeDatabaseQuery(() => db.select().from(ResourceTypeTable));
}

export function getResourceNotes(resourceID: string) {
  return executeDatabaseQuery(() =>
    db
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
  executeDatabaseQuery(() =>
    db
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
