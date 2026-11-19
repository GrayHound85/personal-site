"use client";

import { useState } from "react";

import type {
  ResourcePageContext,
  Resource,
  ResourceNavigation,
  ResourceType,
} from "@/types/resources";

import ResourceNav from "@/components/sections/career/resource/ResourceNav";
import ResourceTopicDescription from "@/components/sections/career/resource/ResourceTopicDescription";
import ResourceList from "@/components/sections/career/resource/ResourcesList";
import EditTopicForm from "@/components/sections/career/resource/EditTopicForm";
import PageLayout from "@c/layout/PageLayout";
import Modal from "@c/ui/Modal";
import type { PathSegment } from "@c/ui/PathNav";

type ResourcePageClientProps = {
  context: ResourcePageContext;
  resourceList: Resource[];
  resourceTypes: ResourceType[];
  navigation: ResourceNavigation;
};

export default function ResourcePageClient({
  context,
  resourceList,
  navigation,
  resourceTypes,
}: ResourcePageClientProps) {
  // On mobile the topic list replaces the content while open. It starts open
  // when no topic is picked yet, as there's nothing else to show. Whichever
  // one appears animates in with starting: (CSS @starting-style), the one
  // leaving just disappears so the two never stack up mid-transition.
  const [mobileNavOpen, setMobileNavOpen] = useState(() => !context.topic);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  function openModal(content: React.ReactNode) {
    setModalContent(content);
  }

  function closeModal() {
    setModalContent(null);
  }

  // home / dashboard / career / resources / <category>
  // home and dashboard only fit on wide screens
  const segments: PathSegment[] = [
    { label: "home", href: "/", wideOnly: true },
    { label: "dashboard", href: "/dashboard", wideOnly: true },
    { label: "career", href: "/career" },
    {
      label: "resources",
      href: context.category ? "/career/resources" : undefined,
    },
  ];

  if (context.category) {
    segments.push({
      label: context.category.slug,
      href: context.topic
        ? `/career/resources/${context.category.slug}`
        : undefined,
    });
  }

  return (
    <>
      <PageLayout
        segments={segments}
        navExtra={
          <div className="ml-auto flex min-w-0 items-center gap-4">
            {context.topic && (
              <h1 className="hidden truncate font-sans text-2xl font-bold md:block">
                {context.topic.name}
              </h1>
            )}

            <button
              type="button"
              aria-label={mobileNavOpen ? "Close topics" : "Open topics"}
              aria-expanded={mobileNavOpen}
              onClick={() => setMobileNavOpen((open) => !open)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-button bg-white/15 transition-colors hover:bg-white/25 md:hidden"
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  d={
                    mobileNavOpen
                      ? "M6 6l12 12M18 6L6 18"
                      : "M4 7h16M4 12h16M4 17h10"
                  }
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>
        }
        className="flex"
      >
        {/*
          On desktop the topic list is fixed to the screen (under the nav, the
          page padding away from the bottom and left) so it never moves while
          the resources scroll. The content leaves room for it with ml-88:
          the list's w-80 plus a 2rem gap.
        */}
        <aside
          className={`
                        ${mobileNavOpen ? "block" : "hidden"}
                        w-full

                        transition
                        duration-150
                        ease-out
                        starting:-translate-x-6
                        starting:opacity-0

                        md:fixed
                        md:top-28
                        md:bottom-6
                        md:left-6
                        md:block
                        md:w-80
                        md:transition-none

                        lg:bottom-8
                        lg:left-8
                    `}
        >
          <ResourceNav
            navigation={navigation}
            context={context}
            onTopicSelect={() => setMobileNavOpen(false)}
            onOpenModal={openModal}
            onCloseModal={closeModal}
          />
        </aside>

        <div
          className={`
                        ${mobileNavOpen ? "hidden" : "flex"}
                        min-w-0
                        flex-1
                        flex-col
                        gap-6

                        transition
                        duration-150
                        ease-out
                        starting:opacity-0

                        md:ml-88
                        md:flex
                        md:transition-none
                    `}
        >
          {/* On desktop the topic name is in the nav bar instead */}
          {context.topic && (
            <h1 className="text-3xl font-bold text-text-primary md:hidden">
              {context.topic.name}
            </h1>
          )}

          {context.topic && context.category && (
            <ResourceTopicDescription
              key={context.topic.id}
              description={null}
              notesHref={`/notes/${context.category.slug}/${context.topic.slug}`}
              topicName={context.topic.name}
              onEdit={() =>
                context.topic &&
                context.category &&
                openModal(
                  <EditTopicForm
                    category={context.category}
                    topic={context.topic}
                    subCategoryId={context.subCategory?.id}
                    onClose={closeModal}
                  />,
                )
              }
            />
          )}
          <ResourceList
            resourceList={resourceList}
            topicId={context.topic?.id}
            resourceTypes={resourceTypes}
            onOpenModal={openModal}
            onCloseModal={closeModal}
          />
        </div>
      </PageLayout>
      <Modal open={modalContent !== null} onClose={closeModal}>
        {modalContent}
      </Modal>
    </>
  );
}
