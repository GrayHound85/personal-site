import { db } from "@d/db";
import { CategoryTable } from "@d/schema";

export function getCategories() {
  return db.select().from(CategoryTable);
}
