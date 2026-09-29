"use client";

import { useState } from "react";

import Modal from "@c/ui/Modal";
import CreateResourceForm from "./CreateResourceForm";

import type {
  Resource,
  ResourcePageContext,
  ResourceType,
} from "@/types/resources";

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
  onOpenModal: (content: React.ReactNode) => void;
};

const resourceTypeIcons: Record<
  ResourceType,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  video: VideoIcon,
  book: BookIcon,
  docs: DocsIcon,
  website: WebIcon,
};

const resourceTypeNames: Record<ResourceType, string> = {
  video: "Videos",
  book: "Books",
  website: "Websites",
  docs: "Docs",
};

export default function ResourceList({
  resourceList,
  onOpenModal,
}: ResourceListProps) {
  const resources = resourceList;
  const groupedResources = resources.reduce(
    (groups, resource) => {
      if (!groups[resource.type]) {
        groups[resource.type] = [];
      }

      groups[resource.type].push(resource);

      return groups;
    },
    {} as Record<ResourceType, Resource[]>,
  );

  console.log(resources);
  return (
    <Card className="flex flex-col w-full h-full pt-3">
      <div className="h-6 flex flex-row gap-3">
        <button
          type="button"
          onClick={() => onOpenModal(<CreateResourceForm />)}
          className="h-5 font-bold w-10"
        >
          +
        </button>
        <div className="flex-1" />
        <div>G</div>
        <div>L</div>
      </div>
      <DividerLine className="mt-1" />
      <div className="flex flex-col">
        {Object.entries(groupedResources).map(([type, resources]) => {
          const Icon = resourceTypeIcons[type as ResourceType];

          return (
            <section key={type} className="flex flex-col gap-5">
              <h2 className="flex flex-row gap-3 font-bold text-2xl align-text-bottom">
                <Icon className="w-8 h-8 shrink-0" />
                {resourceTypeNames[type as ResourceType]}
              </h2>

              {resources.map((resource) => (
                <LinkButton
                  href={resource.url}
                  key={resource.id}
                  className="
                      group
                      justify-between!
                      rounded-card_inner!
                      border!
                      border-border/60!
                      bg-panel/50!
                      px-6!
                      py-5!
                      text-left!
                      text-text-primary!
                      h-13

                      transition-all
                      duration-200

                      hover:-translate-y-0.5
                      hover:border-primary/40!
                      hover:bg-panel/70!
                      hover:shadow-lg!
                    "
                >
                  <div className="flex w-full items-center justify-between gap-4">
                    <span className="font-medium text-text-secondary transition-colors group-hover:text-primary">
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
        })}
      </div>
    </Card>
  );
}
