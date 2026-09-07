import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const Category = pgTable("Category", {
  category_id: uuid("category_id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
});
