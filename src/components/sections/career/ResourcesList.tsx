import { getResourcesByContext } from "@/lib/service/s-resources";

import type {
  Resource,
  ResourcePageContext,
  ResourceType,
} from "@/types/resources";

import Card from "@/components/ui/Card";
import DividerLine from "@/components/ui/DividerLine";
import LinkButton from "@/components/ui/LinkButton";

type ResourceListProps = {
  context: ResourcePageContext;
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
        {Object.entries(groupedResources).map(([type, resources]) => (
          <section key={type}>
            <h2>{type}</h2>

            {resources.map((resource) => (
              <Card
                key={resource.id}
                className="
                    group
                    flex min-h-15 items-center
                    border-border/60
                    bg-panel/50
                    px-6 py-5
                    transition-all duration-200
                    hover:-translate-y-0.5
                    hover:border-primary/40
                    hover:bg-panel/70
                    hover:shadow-lg
                "
              >
                <div className="flex items-center justify-between gap-4 w-full">
                  <span className="font-medium text-text-primary transition-colors group-hover:text-primary">
                    {resource.title}
                  </span>

                  <span className="text-text-secondary transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Card>
            ))}
          </section>
        ))}
      </div>
    </Card>
  );
}
