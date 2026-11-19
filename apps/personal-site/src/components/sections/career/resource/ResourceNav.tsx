"use client";

import Link from "next/link";

import RepoPanel from "@repo/ui/components/RepoPanel";
import CreateCategoryForm from "./CreateCategoryForm";
import CreateSubCategoryForm from "./CreateSubCategoryForm";
import CreateTopicForm from "./CreateTopicForm";
import EditButton from "./EditButton";
import EditCategoryForm from "./EditCategoryForm";
import EditSubCategoryForm from "./EditSubCategoryForm";

import type {
  ResourceNavigation,
  ResourceNavigationTopic,
  ResourcePageContext,
} from "@/types/resources";

type ResourceNavigationProps = {
  navigation: ResourceNavigation;
  context: ResourcePageContext;
  onTopicSelect: () => void;
  onOpenModal: (content: React.ReactNode) => void;
  onCloseModal: () => void;
};

const linkClassName =
  "block rounded-button px-3 py-2 text-sm transition-colors hover:bg-white/10 hover:text-text-primary";

// The "+ topic" style buttons at the bottom of the panel
const addButtonClassName =
  "flex flex-1 items-center gap-2 rounded-button bg-white/5 px-3 py-2 text-left font-mono text-xs text-text-secondary transition-colors hover:bg-white/10 hover:text-text-primary";

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
  onOpenModal,
  onCloseModal,
}: ResourceNavigationProps) {
  const category = context.category;

  return (
    <nav aria-label="Resource topics" className="md:h-full">
      <RepoPanel
        title={category ? category.name : "categories"}
        action={
          category && (
            <div className="flex shrink-0 items-center gap-2">
              <EditButton
                label={`Edit ${category.name}`}
                onClick={() =>
                  onOpenModal(
                    <EditCategoryForm
                      category={category}
                      onClose={onCloseModal}
                    />,
                  )
                }
              />
              <Link
                href="/career/resources"
                className="font-mono text-xs text-text-secondary transition-colors hover:text-text-primary"
              >
                ← all
              </Link>
            </div>
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
                <div className="flex items-center justify-between gap-2 pt-2 pr-1 pb-1 pl-3">
                  <h3 className="font-mono text-xs uppercase tracking-wide text-primary">
                    {subCategory.name}
                  </h3>
                  <EditButton
                    label={`Edit ${subCategory.name}`}
                    onClick={() =>
                      onOpenModal(
                        <EditSubCategoryForm
                          category={category}
                          subCategory={subCategory}
                          onClose={onCloseModal}
                        />,
                      )
                    }
                    className="-my-1 h-6 w-6"
                  />
                </div>
                <TopicList
                  topics={subCategory.topics}
                  categorySlug={category.slug}
                  activeTopicId={context.topic?.id}
                  onTopicSelect={onTopicSelect}
                />
              </div>
            ))}

            {category.topics.length === 0 &&
              category.subCategories.length === 0 && (
                <p className="px-3 py-2 text-sm text-text-secondary">
                  Nothing in here yet.
                </p>
              )}

            <div className="flex gap-2 border-t border-white/10 pt-3">
              <button
                type="button"
                onClick={() =>
                  onOpenModal(
                    <CreateTopicForm
                      category={category}
                      onClose={onCloseModal}
                    />,
                  )
                }
                className={addButtonClassName}
              >
                <span className="text-primary">+</span> topic
              </button>
              <button
                type="button"
                onClick={() =>
                  onOpenModal(
                    <CreateSubCategoryForm
                      category={category}
                      onClose={onCloseModal}
                    />,
                  )
                }
                className={addButtonClassName}
              >
                <span className="text-primary">+</span> subcategory
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
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

            <div className="flex border-t border-white/10 pt-3">
              <button
                type="button"
                onClick={() =>
                  onOpenModal(<CreateCategoryForm onClose={onCloseModal} />)
                }
                className={addButtonClassName}
              >
                <span className="text-primary">+</span> category
              </button>
            </div>
          </div>
        )}
      </RepoPanel>
    </nav>
  );
}
