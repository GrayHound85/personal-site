"use client";

import CreateResourceForm from "./CreateResourceForm";

import type { Resource, ResourceType } from "@/types/resources";

import Card from "@/components/ui/Card";
import DividerLine from "@c/ui/DividerLine";
import LinkButton from "@c/ui/LinkButton";
import BookIcon from "@c/icons/BooksIcon";
import VideoIcon from "@c/icons/VideoIcon";
import DocsIcon from "@c/icons/DocsIcon";
import WebIcon from "@c/icons/WebIcon";
import ArrowIcon from "@c/icons/ArrowIcon";

type ResourceListProps = {
  resourceList: Resource[];
  resourceTypes: ResourceType[];
  topicId?: string;
  onOpenModal: (content: React.ReactNode) => void;
  onCloseModal: () => void;
};

const resourceTypeIcons: Record<
  string,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  video: VideoIcon,
  book: BookIcon,
  docs: DocsIcon,
  website: WebIcon,
};

const resourceTypeNames: Record<string, string> = {
  video: "Videos",
  book: "Books",
  website: "Websites",
  docs: "Docs",
};

export default function ResourceList({
  resourceList,
  resourceTypes,
  topicId,
  onOpenModal,
  onCloseModal,
}: ResourceListProps) {
  const groupedResources = resourceList.reduce(
    (groups, resource) => {
      const typeCode = resource.type.code;

      if (!groups[typeCode]) {
        groups[typeCode] = [];
      }

      groups[typeCode].push(resource);

      return groups;
    },
    {} as Record<string, Resource[]>,
  );

  return (
    <Card className="flex min-h-0 w-full flex-1 flex-col p-3 pt-3 md:p-8 md:pt-3">
      <div className="flex h-7 flex-row gap-2 md:h-6 md:gap-3">
        {topicId && (
          <button
            type="button"
            aria-label="Create resource"
            onClick={() =>
              onOpenModal(
                <CreateResourceForm
                  topicId={topicId}
                  resourceTypes={resourceTypes}
                  onClose={onCloseModal}
                />,
              )
            }
            className="h-7 w-10 font-bold md:h-5"
          >
            +
          </button>
        )}

        <div className="flex-1" />

        <div>G</div>
        <div>L</div>
      </div>

      <DividerLine className="mt-1" />
      <div className="scrollbar-hidden min-h-0 flex-1 overflow-y-auto">
        <div className="flex flex-col gap-4 md:gap-7">
          {resourceList.length === 0 ? (
            <p className="px-2 py-4 text-sm text-text-secondary">
              {topicId
                ? "No resources have been added yet."
                : "Select a topic to view its resources."}
            </p>
          ) : (
            Object.entries(groupedResources).map(([typeCode, resources]) => {
              const Icon = resourceTypeIcons[typeCode];

              return (
                <section
                  key={typeCode}
                  className="flex flex-col gap-1 md:gap-2"
                >
                  <h2 className="flex flex-row items-center gap-2 text-lg font-bold align-text-bottom md:gap-3 md:text-2xl">
                    {Icon && (
                      <Icon className="h-6 w-6 shrink-0 md:h-8 md:w-8" />
                    )}

                    {resourceTypeNames[typeCode] ?? typeCode}
                  </h2>

                  {resources.map((resource) => (
                    <LinkButton
                      href={resource.url}
                      key={resource.id}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                      group
                      h-11
                      md:h-13
                      justify-between!
                      rounded-card_inner!
                      border!
                      border-border/40!
                      bg-panel/40
                      px-3!
                      py-3!
                      md:px-6!
                      md:py-5!
                      text-left!
                      text-text-primary!
                      transition-all
                      duration-100
                      hover:-translate-y-0.5
                      hover:bg-primary-hover
                      hover:shadow-lg!
                    "
                    >
                      <div className="flex w-full items-center justify-between gap-4">
                        <span className="font-medium text-text-secondary transition-colors group-hover:text-text-primary">
                          {resource.title}
                        </span>

                        <ArrowIcon
                          direction="right"
                          className="text-text-secondary transition-transform duration-200 group-hover:translate-x-1"
                        />
                      </div>
                    </LinkButton>
                  ))}
                </section>
              );
            })
          )}
        </div>
      </div>
    </Card>
  );
}
