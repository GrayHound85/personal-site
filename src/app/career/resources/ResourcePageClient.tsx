"use client";

import { useState } from "react";

import type {
  ResourcePageContext,
  Resource,
  ResourceNavigation,
  ResourceType,
} from "@/types/resources";

import ResourceNav from "@/components/sections/career/resource/ResourceNav";
import ResourceHeader from "@/components/sections/career/resource/ResourceHeader";
import ResourceTopicDescription from "@/components/sections/career/resource/ResourceTopicDescription";
import ResourceList from "@/components/sections/career/resource/ResourcesList";
import BackgroundLayout from "@c/layout/BackgroundLayout";
import Modal from "@c/ui/Modal";

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
  const [mobileNavOpen, setMobileNavOpen] = useState(() => !context.topic);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  function openModal(content: React.ReactNode) {
    setModalContent(content);
  }

  function closeModal() {
    setModalContent(null);
  }
  return (
    <>
      <BackgroundLayout background="subtle">
        <main className="flex h-screen min-h-0 w-full flex-col gap-3 overflow-hidden md:gap-5">
          <ResourceHeader
            context={context}
            navigationOpen={mobileNavOpen}
            onToggleNavigation={() => setMobileNavOpen((open) => !open)}
          />
          <div className="relative flex min-h-0 flex-1 flex-row gap-5 p-3 md:gap-5 md:pb-5 md:pr-5 md:pt-0 md:pl-0">
            <div
              className={`fixed bottom-3 left-0 right-3 top-23 z-20 transform transition-transform duration-300 ease-in-out motion-reduce:transition-none md:relative md:inset-auto md:z-auto md:block md:h-full md:w-80 md:shrink-0 md:translate-x-0 md:transform-none md:transition-none md:pointer-events-auto ${mobileNavOpen ? "translate-x-0 pointer-events-auto" : "-translate-x-full pointer-events-none"}`}
            >
              <ResourceNav
                navigation={navigation}
                context={context}
                onTopicSelect={() => setMobileNavOpen(false)}
              />
            </div>
            <div
              className={`flex min-h-0 flex-1 flex-col gap-3 transition-opacity duration-300 ease-out motion-reduce:transition-none md:pointer-events-auto md:opacity-100 md:transition-none md:gap-5 ${mobileNavOpen ? "pointer-events-none opacity-0" : "opacity-100"}`}
            >
              {context.topic && context.category && (
                <ResourceTopicDescription
                  key={context.topic.id}
                  description={null}
                  notesHref={`/notes/${context.category.slug}/${context.topic.slug}`}
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
          </div>
        </main>
      </BackgroundLayout>
      <Modal open={modalContent !== null} onClose={closeModal}>
        {modalContent}
      </Modal>
    </>
  );
}
