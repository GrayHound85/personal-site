"use client";

import Link from "next/link";

import ArrowIcon from "@/components/icons/ArrowIcon";
import LinkButton from "@/components/ui/LinkButton";

import type {
  ResourceNavigation,
  ResourcePageContext,
} from "@/types/resources";

type ResourceNavigationProps = {
  navigation: ResourceNavigation;
  context: ResourcePageContext;
  onTopicSelect: () => void;
};

export default function ResourceNav({
  navigation,
  context,
  onTopicSelect,
}: ResourceNavigationProps) {
  return (
    <nav className="h-full w-full overflow-y-auto rounded-r-card border border-border bg-panel p-4 md:w-80 md:p-6">
      {context.category ? (
        <>
          <LinkButton
            href="/career/resources"
            className=" flex items-center gap-2 px-3 py-2 text-l text-text-primary transition-colors mb-4"
          >
            <ArrowIcon direction="left" />
            <span className="truncate">{context.category.name}</span>
          </LinkButton>

          <div className="space-y-6">
            {/* Topics directly inside the category */}
            {context.category.topics.length > 0 && (
              <ul className="space-y-1">
                {context.category.topics.map((topic) => (
                  <li key={topic.id}>
                    <Link
                      href={`/career/resources/${context.category?.slug}/${topic.slug}`}
                      onNavigate={onTopicSelect}
                      className="block rounded-lg px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-primary-hover hover:text-text-primary"
                    >
                      {topic.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {/* Subcategories */}
            {context.category?.subCategories.map((subCategory) => (
              <div key={subCategory.id}>
                <h3 className="mb-2 px-3 text-sm font-semibold text-primary">
                  {subCategory.name}
                </h3>

                {subCategory.topics.length > 0 && (
                  <ul className="space-y-1">
                    {subCategory.topics.map((topic) => (
                      <li key={topic.id}>
                        <Link
                          href={`/career/resources/${context.category?.slug}/${topic.slug}`}
                          onNavigate={onTopicSelect}
                          className="block rounded-lg px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-primary-hover hover:text-text-primary"
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
          {/* Back to categories */}
        </>
      ) : (
        <>
          {/* Category list */}
          <ul className="space-y-1">
            {navigation.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/career/resources/${category.slug}`}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-m font-semibold text-text-secondary transition-colors hover:bg-primary-hover hover:text-text-primary"
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
