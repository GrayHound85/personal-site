"use client";

import { useState } from "react";

import type { ResourceNavigation } from "@/types/resources";

type ResourceNavigationProps = {
  navigation: ResourceNavigation;
};

export default function ResourceNavigation({
  navigation,
}: ResourceNavigationProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );

  const selectedCategory = navigation.find(
    (category) => category.id === selectedCategoryId,
  );

  return (
    <nav className="fixed left-0 top-0 h-screen w-72 border-r border-gray-200 bg-white p-6">
      {selectedCategory ? (
        <>
          <button
            type="button"
            onClick={() => setSelectedCategoryId(null)}
            className="mb-6 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            ← All Categories
          </button>

          <h2 className="mb-6 text-xl font-semibold">
            {selectedCategory.name}
          </h2>

          <div className="space-y-6">
            {selectedCategory.topics.length > 0 && (
              <ul className="space-y-2">
                {selectedCategory.topics.map((topic) => (
                  <li key={topic.id}>
                    <button
                      type="button"
                      className="text-left text-sm text-gray-700 hover:text-gray-900"
                    >
                      {topic.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {selectedCategory.subCategories.map((subCategory) => (
              <div key={subCategory.id}>
                <h3 className="mb-2 text-sm font-semibold text-gray-900">
                  {subCategory.name}
                </h3>

                <ul className="space-y-2">
                  {subCategory.topics.map((topic) => (
                    <li key={topic.id}>
                      <button
                        type="button"
                        className="text-left text-sm text-gray-600 hover:text-gray-900"
                      >
                        {topic.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <h2 className="mb-6 text-xl font-semibold">Resources</h2>

          <ul className="space-y-2">
            {navigation.map((category) => (
              <li key={category.id}>
                <button
                  type="button"
                  onClick={() => setSelectedCategoryId(category.id)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  <span>{category.name}</span>
                  <span>→</span>
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </nav>
  );
}
