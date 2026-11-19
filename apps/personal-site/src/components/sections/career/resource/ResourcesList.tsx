"use client";

import CreateResourceForm from "./CreateResourceForm";
import EditButton from "./EditButton";
import EditResourceForm from "./EditResourceForm";

import type { Resource, ResourceType } from "@/types/resources";

import RepoPanel from "@repo/ui/components/RepoPanel";
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

// "https://www.youtube.com/watch?v=..." -> "youtube.com"
function siteName(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

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
    <RepoPanel
      title="resources"
      action={
        topicId && (
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-text-secondary">
              {resourceList.length}{" "}
              {resourceList.length === 1 ? "resource" : "resources"}
            </span>
            <button
              type="button"
              aria-label="Add resource"
              onClick={() =>
                onOpenModal(
                  <CreateResourceForm
                    topicId={topicId}
                    resourceTypes={resourceTypes}
                    onClose={onCloseModal}
                  />,
                )
              }
              className="flex h-8 w-8 items-center justify-center rounded-button bg-white/10 font-mono text-lg leading-none text-text-primary transition-colors hover:bg-white/20"
            >
              +
            </button>
          </div>
        )
      }
    >
      {resourceList.length === 0 ? (
        <p className="text-text-secondary">
          {topicId
            ? "No resources have been added yet."
            : "Pick a topic to see its resources."}
        </p>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedResources).map(([typeCode, resources]) => {
            const Icon = resourceTypeIcons[typeCode];

            return (
              <section key={typeCode}>
                <h2 className="flex items-center gap-2 border-b border-white/10 pb-3 text-xl font-semibold text-text-primary">
                  {Icon && (
                    <Icon
                      aria-hidden="true"
                      className="h-5 w-5 shrink-0 text-primary"
                    />
                  )}
                  {resourceTypeNames[typeCode] ?? typeCode}
                </h2>

                <ul className="mt-4 space-y-2">
                  {resources.map((resource) => (
                    <li
                      key={resource.id}
                      className="group flex items-center rounded-card_inner border border-white/10 bg-panel/50 transition-colors hover:bg-white/10"
                    >
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex min-w-0 flex-1 items-center justify-between gap-4 py-3 pr-2 pl-4"
                      >
                        <span className="min-w-0">
                          <span className="block truncate font-medium text-text-primary">
                            {resource.title}
                          </span>
                          <span className="block truncate font-mono text-xs text-text-secondary">
                            {siteName(resource.url)}
                          </span>
                        </span>

                        <ArrowIcon
                          direction="right"
                          className="shrink-0 text-text-secondary transition-transform duration-200 group-hover:translate-x-1"
                        />
                      </a>

                      {/* Separate from the link, a button can't sit inside an <a> */}
                      <EditButton
                        label={`Edit ${resource.title}`}
                        onClick={() =>
                          onOpenModal(
                            <EditResourceForm
                              resource={resource}
                              resourceTypes={resourceTypes}
                              onClose={onCloseModal}
                            />,
                          )
                        }
                        className="mr-3"
                      />
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </RepoPanel>
  );
}
