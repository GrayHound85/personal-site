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
  slug?: string[];
  resourceList: Resource[];
  resourceTypes: ResourceType[];
  navigation: ResourceNavigation;
};

export default function ResourcePageClient({
  context,
  slug,
  resourceList,
  navigation,
  resourceTypes,
}: ResourcePageClientProps) {
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
        <main className="flex flex-col w-full h-full gap-5">
          <ResourceHeader context={context} />
          <div className="flex flex-row h-full w-full gap-5 pb-5 pr-5">
            <ResourceNav navigation={navigation} context={context} />
            <div className="flex flex-col w-full h-full gap-5">
              <ResourceTopicDescription
                description={"fesfesf"}
                notesSlug={slug}
              />
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
