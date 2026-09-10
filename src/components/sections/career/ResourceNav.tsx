"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { ResourceNavigation } from "@/types/resources";

type ResourceNavigationProps = {
  navigation: ResourceNavigation;
};

export default function ResourceNavigation({
  navigation,
}: ResourceNavigationProps) {
  const pathname = usePathname();

  const slug = pathname
    .replace("/career/resources", "")
    .split("/")
    .filter(Boolean);

  const categorySlug = slug[0];

  const selectedCategory = navigation.find(
    (category) => category.slug === categorySlug,
  );

  return (
    <nav className="fixed left-0 top-0 h-screen w-72 border-r border-gray-200 bg-white p-6">
      {selectedCategory ? (
        <>
          {/* Back to categories */}
          <Link
            href="/career/resources"
            className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
          >
            <span>←</span>
            <span>All Categories</span>
          </Link>

          {/* Category title */}
          <h2 className="mb-6 text-xl font-semibold text-gray-900">
            {selectedCategory.name}
          </h2>

          <div className="space-y-6">
            {/* Topics directly inside the category */}
            {selectedCategory.topics.length > 0 && (
              <ul className="space-y-1">
                {selectedCategory.topics.map((topic) => (
                  <li key={topic.id}>
                    <Link
                      href={`/career/resources/${selectedCategory.slug}/${topic.slug}`}
                      className="block rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
                    >
                      {topic.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {/* Subcategories */}
            {selectedCategory.subCategories.map((subCategory) => (
              <div key={subCategory.id}>
                <h3 className="mb-2 px-3 text-sm font-semibold text-gray-900">
                  {subCategory.name}
                </h3>

                {subCategory.topics.length > 0 && (
                  <ul className="space-y-1">
                    {subCategory.topics.map((topic) => (
                      <li key={topic.id}>
                        <Link
                          href={`/career/resources/${selectedCategory.slug}/${topic.slug}`}
                          className="block rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
                        >
                          {topic.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Category list */}
          <h2 className="mb-6 text-xl font-semibold text-gray-900">
            Resources
          </h2>

          <ul className="space-y-1">
            {navigation.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/career/resources/${category.slug}`}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
                >
                  <span>{category.name}</span>
                  <span>→</span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </nav>
  );
}
