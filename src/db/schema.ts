import { pgTable, uuid, varchar, timestamp, text } from "drizzle-orm/pg-core";

export const CategoryTable = pgTable("Category", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  slug: varchar("slug", { length: 255 }).unique().notNull(),
});

export const SubCategoryTable = pgTable("SubCategory", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  categoryId: uuid("categoryId")
    .references(() => CategoryTable.id, {
      onDelete: "restrict",
    })
    .notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).unique().notNull(),
});

export const TopicTable = pgTable("Topic", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).unique().notNull(),
  categoryId: uuid("categoryId")
    .references(() => CategoryTable.id, {
      onDelete: "restrict",
    })
    .notNull(),
  subCategoryId: uuid("subCategoryId").references(() => SubCategoryTable.id, {
    onDelete: "restrict",
  }),
});

export const ResourceTypeTable = pgTable("ResourceType", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  code: varchar("code", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull().unique(),
});

export const ResourceTable = pgTable("Resource", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  topicId: uuid("topicId")
    .references(() => TopicTable.id, {
      onDelete: "cascade",
    })
    .notNull(),
  resourceTypeId: uuid("resourceTypeId")
    .references(() => ResourceTypeTable.id, {
      onDelete: "restrict",
    })
    .notNull(),
  url: varchar("url", { length: 2048 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const ResourceNotesTable = pgTable("ResourceNotes", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  resourceId: uuid("resourceId")
    .references(() => ResourceTable.id, {
      onDelete: "cascade",
    })
    .notNull()
    .unique(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  summary: text("summary"),
  notes: text("notes"),
});
