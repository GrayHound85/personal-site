import { db } from "@d/db";
import {
  CategoryTable,
  ResourceTable,
  ResourceNotesTable,
  ResourceTypeTable,
  SubCategoryTable,
  TopicTable,
} from "@d/schema";
import { UUID } from "crypto";
import { eq } from "drizzle-orm";

export function getCategories() {
  return db.select().from(CategoryTable);
}

export function getSubCategories() {
  return db.select().from(SubCategoryTable);
}

export function getTopics() {
  return db.select().from(TopicTable);
}

export function getSubCategoriesByCategory(categoryId: string) {
  return db
    .select()
    .from(SubCategoryTable)
    .where(eq(SubCategoryTable.categoryId, categoryId));
}

export function getTopicsByCategory(categoryId: string) {
  return db
    .select()
    .from(TopicTable)
    .where(eq(TopicTable.categoryId, categoryId));
}

export function getTopicsBySubCategory(subCategoryId: string) {
  return db
    .select()
    .from(TopicTable)
    .where(eq(TopicTable.subCategoryId, subCategoryId));
}

export function getTopicBySlug(slug: string) {
  return db.select().from(TopicTable).where(eq(TopicTable.slug, slug));
}

export function getResources() {
  return db.select().from(ResourceTable);
}

export function getResourcesByTopic(topicId: string) {
  return db
    .select()
    .from(ResourceTable)
    .where(eq(ResourceTable.topicId, topicId));
}

export function getResource(resourceId: string) {
  return db
    .select()
    .from(ResourceTable)
    .where(eq(ResourceTable.id, resourceId));
}

export function getResourceTypes() {
  return db.select().from(ResourceTypeTable);
}

export function getResourceNotes(resourceID: string) {
  return db
    .select()
    .from(ResourceNotesTable)
    .where(eq(ResourceNotesTable.resourceId, resourceID));
}
