import { getResourcesByContext } from "@/lib/service/s-resources";

import type {
  Resource,
  ResourcePageContext,
  ResourceType,
} from "@/types/resources";

import Card from "@/components/ui/Card";
import DividerLine from "@/components/ui/DividerLine";
import LinkButton from "@/components/ui/LinkButton";
import BookIcon from "@c/icons/BooksIcon";
import VideoIcon from "@/components/icons/VideoIcon";
import DocsIcon from "@/components/icons/DocsIcon";
import WebIcon from "@/components/icons/WebIcon";
import Link from "next/link";

type ResourceListProps = {
  context: ResourcePageContext;
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

export default async function ResourceList({ context }: ResourceListProps) {
  const resources = await getResourcesByContext(context);
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
    <Card className="flex flex-col w-full h-full">
      <DividerLine />
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
                      rounded-card!
                      border!
                      border-border/60!
                      bg-panel/50!
                      px-6!
                      py-5!
                      text-left!
                      text-text-primary!

                      transition-all
                      duration-200

                      hover:-translate-y-0.5
                      hover:border-primary/40!
                      hover:bg-panel/70!
                      hover:shadow-lg!
                    "
                >
                  <div className="flex w-full items-center justify-between gap-4">
                    <span className="font-medium text-text-primary transition-colors group-hover:text-primary">
                      {resource.title}
                    </span>

                    <span className="text-text-secondary transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
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
