import "dotenv/config";

import { drizzle } from "drizzle-orm/postgres-js";

import {
  CategoryTable,
  ResourceNotesTable,
  ResourceTable,
  ResourceTypeTable,
  SubCategoryTable,
  TopicTable,
} from "@/db/schema";

const db = drizzle(process.env.DATABASE_URL!);

async function seed() {
  console.log("Seeding database...");

  // Clear existing data in dependency order.
  await db.delete(ResourceNotesTable);
  await db.delete(ResourceTable);
  await db.delete(TopicTable);
  await db.delete(SubCategoryTable);
  await db.delete(CategoryTable);
  await db.delete(ResourceTypeTable);

  console.log("Cleared existing data.");

  // ---------------------------------------------------------------------------
  // Resource types
  // ---------------------------------------------------------------------------

  const [video, website, book, documentation] = await db
    .insert(ResourceTypeTable)
    .values([
      {
        code: "video",
        name: "Video",
      },
      {
        code: "website",
        name: "Website",
      },
      {
        code: "book",
        name: "Book",
      },
      {
        code: "docs",
        name: "Documentation",
      },
    ])
    .returning();

  // ---------------------------------------------------------------------------
  // Categories
  // ---------------------------------------------------------------------------

  const [programming, computerScience, mathematics] = await db
    .insert(CategoryTable)
    .values([
      {
        name: "Programming",
        slug: "programming",
      },
      {
        name: "Computer Science",
        slug: "computer-science",
      },
      {
        name: "Mathematics",
        slug: "mathematics",
      },
    ])
    .returning();

  // ---------------------------------------------------------------------------
  // Subcategories
  // ---------------------------------------------------------------------------

  const [webDevelopment, systemsProgramming, algorithms] = await db
    .insert(SubCategoryTable)
    .values([
      {
        categoryId: programming.id,
        name: "Web Development",
        slug: "web-development",
      },
      {
        categoryId: programming.id,
        name: "Systems Programming",
        slug: "systems-programming",
      },
      {
        categoryId: computerScience.id,
        name: "Algorithms",
        slug: "algorithms",
      },
    ])
    .returning();

  // ---------------------------------------------------------------------------
  // Topics
  // ---------------------------------------------------------------------------

  const [
    python,
    javascript,
    react,
    nextjs,
    cpp,
    rust,
    dataStructures,
    algorithmsTopic,
    discreteMaths,
  ] = await db
    .insert(TopicTable)
    .values([
      {
        categoryId: programming.id,
        subCategoryId: null,
        name: "Python",
        slug: "python",
      },
      {
        categoryId: programming.id,
        subCategoryId: webDevelopment.id,
        name: "JavaScript",
        slug: "javascript",
      },
      {
        categoryId: programming.id,
        subCategoryId: webDevelopment.id,
        name: "React",
        slug: "react",
      },
      {
        categoryId: programming.id,
        subCategoryId: webDevelopment.id,
        name: "Next.js",
        slug: "nextjs",
      },
      {
        categoryId: programming.id,
        subCategoryId: systemsProgramming.id,
        name: "C++",
        slug: "cpp",
      },
      {
        categoryId: programming.id,
        subCategoryId: systemsProgramming.id,
        name: "Rust",
        slug: "rust",
      },
      {
        categoryId: computerScience.id,
        subCategoryId: algorithms.id,
        name: "Data Structures",
        slug: "data-structures",
      },
      {
        categoryId: computerScience.id,
        subCategoryId: algorithms.id,
        name: "Algorithms",
        slug: "algorithms",
      },
      {
        categoryId: mathematics.id,
        subCategoryId: null,
        name: "Discrete Mathematics",
        slug: "discrete-mathematics",
      },
    ])
    .returning();

  // ---------------------------------------------------------------------------
  // Resources
  // ---------------------------------------------------------------------------

  const [
    pythonResource,
    reactResource,
    nextResource,
    cppResource,
    javascriptResource,
    algorithmsResource,
  ] = await db
    .insert(ResourceTable)
    .values([
      {
        title: "Python Official Documentation",
        topicId: python.id,
        resourceTypeId: documentation.id,
        url: "https://docs.python.org/3/",
      },
      {
        title: "React Official Documentation",
        topicId: react.id,
        resourceTypeId: documentation.id,
        url: "https://react.dev/",
      },
      {
        title: "Next.js Documentation",
        topicId: nextjs.id,
        resourceTypeId: documentation.id,
        url: "https://nextjs.org/docs",
      },
      {
        title: "The Cherno — C++",
        topicId: cpp.id,
        resourceTypeId: video.id,
        url: "https://www.youtube.com/@TheCherno",
      },
      {
        title: "MDN JavaScript Guide",
        topicId: javascript.id,
        resourceTypeId: website.id,
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      },
      {
        title: "Introduction to Algorithms",
        topicId: algorithmsTopic.id,
        resourceTypeId: book.id,
        url: "https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/",
      },
    ])
    .returning();

  // ---------------------------------------------------------------------------
  // Resource notes
  // ---------------------------------------------------------------------------

  await db.insert(ResourceNotesTable).values([
    {
      resourceId: pythonResource.id,
      summary:
        "The official Python documentation covering the language, standard library, and Python ecosystem.",
      notes:
        "Useful as a reference when working with Python.\n\n**Good for:**\n- Language reference\n- Standard library\n- Tutorials\n- API documentation",
    },
    {
      resourceId: reactResource.id,
      summary:
        "The official React documentation covering components, hooks, state, and modern React development.",
      notes:
        "Use this as the primary reference when learning modern React.\n\n**Focus on:**\n- Components\n- Props\n- State\n- Hooks\n- Server Components",
    },
    {
      resourceId: nextResource.id,
      summary: "Official documentation for Next.js and the App Router.",
      notes:
        "Particularly useful for understanding the App Router architecture used by this project.",
    },
    {
      resourceId: cppResource.id,
      summary:
        "A large collection of C++ programming tutorials and explanations.",
      notes: "Good supplementary resource while improving C++ knowledge.",
    },
    {
      resourceId: javascriptResource.id,
      summary:
        "MDN's JavaScript guide covering the language and its core features.",
      notes:
        "A useful reference for JavaScript syntax, APIs, and language concepts.",
    },
    {
      resourceId: algorithmsResource.id,
      summary:
        "A comprehensive textbook covering algorithms and data structures.",
      notes:
        "Useful for developing a deeper understanding of algorithm design and analysis.",
    },
  ]);

  console.log("Seed completed successfully.");
}

seed().catch((error) => {
  console.error("Seed failed:");
  console.error(error);
  process.exit(1);
});
