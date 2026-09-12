import type { ResourcePageContext } from "@/types/resources";

type ResourceHeaderProps = {
  context: ResourcePageContext;
};

export default function ResourceHeader({ context }: ResourceHeaderProps) {
  return (
    <header className="flex flex-row gap-10 h-20 w-full bg-panel border-b border-primary items-center p-5">
      <h1 className="text-xl font-semibold text-primary">Resources</h1>
      <div className="text-xl font-semibold text-primary">|</div>
      <h1 className="text-xl  text-text-primary">
        {context.topic ? context.topic.name : ""}
      </h1>
    </header>
  );
}
