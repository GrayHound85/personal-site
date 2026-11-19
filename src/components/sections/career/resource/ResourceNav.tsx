"use client";

import Link from "next/link";

import RepoPanel from "@c/ui/RepoPanel";

import type {
  ResourceNavigation,
  ResourceNavigationTopic,
  ResourcePageContext,
} from "@/types/resources";

type ResourceNavigationProps = {
  navigation: ResourceNavigation;
  context: ResourcePageContext;
  onTopicSelect: () => void;
};

const linkClassName =
  "block rounded-button px-3 py-2 text-sm transition-colors hover:bg-white/10 hover:text-text-primary";

type TopicListProps = {
  topics: ResourceNavigationTopic[];
  categorySlug: string;
  activeTopicId?: string;
  onTopicSelect: () => void;
};

function TopicList({
  topics,
  categorySlug,
  activeTopicId,
  onTopicSelect,
}: TopicListProps) {
  return (
    <ul className="space-y-1">
      {topics.map((topic) => {
        const active = topic.id === activeTopicId;

        return (
          <li key={topic.id}>
            <Link
              href={`/career/resources/${categorySlug}/${topic.slug}`}
              onNavigate={onTopicSelect}
              aria-current={active ? "page" : undefined}
              className={`${linkClassName} ${active ? "bg-white/10 text-text-primary" : "text-text-secondary"}`}
            >
              {topic.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

// The left hand panel: every category, or once one is picked, its topics
// grouped by subcategory.
export default function ResourceNav({
  navigation,
  context,
  onTopicSelect,
}: ResourceNavigationProps) {
  const category = context.category;

  return (
    <nav aria-label="Resource topics" className="md:h-full">
      <RepoPanel
        title={category ? category.name : "categories"}
        action={
          category && (
            <Link
              href="/career/resources"
              className="shrink-0 font-mono text-xs text-text-secondary transition-colors hover:text-text-primary"
            >
              ← all
            </Link>
          )
        }
        className="flex flex-col md:h-full"
        bodyClassName="scrollbar-hidden flex-1 overflow-y-auto p-2 lg:p-2"
      >
        {category ? (
          <div className="space-y-4">
            {/* Topics directly inside the category */}
            {category.topics.length > 0 && (
              <TopicList
                topics={category.topics}
                categorySlug={category.slug}
                activeTopicId={context.topic?.id}
                onTopicSelect={onTopicSelect}
              />
            )}

            {category.subCategories.map((subCategory) => (
              <div key={subCategory.id}>
                <h3 className="px-3 pt-2 pb-1 font-mono text-xs uppercase tracking-wide text-primary">
                  {subCategory.name}
                </h3>
                <TopicList
                  topics={subCategory.topics}
                  categorySlug={category.slug}
                  activeTopicId={context.topic?.id}
                  onTopicSelect={onTopicSelect}
                />
              </div>
            ))}
          </div>
        ) : (
          <ul className="space-y-1">
            {navigation.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/career/resources/${item.slug}`}
                  className={`${linkClassName} flex items-center justify-between text-text-secondary`}
                >
                  <span>{item.name}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </RepoPanel>
    </nav>
  );
}
