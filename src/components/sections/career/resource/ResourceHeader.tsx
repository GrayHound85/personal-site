import type { ResourcePageContext } from "@/types/resources";

type ResourceHeaderProps = {
  context: ResourcePageContext;
};

export default function ResourceHeader({ context }: ResourceHeaderProps) {
  return (
    <header className="flex h-20 shrink-0 flex-row items-center gap-10 border-b border-primary bg-panel p-5">
      <h1 className="text-xl font-semibold text-primary">Resources</h1>
      <div className="text-xl font-semibold text-primary">|</div>
      <h1 className="text-2xl text-text-primary w-full flex justify-center font-bold">
        {context.topic ? context.topic.name : ""}
      </h1>
      <div className="w-1/11" />
    </header>
  );
}
