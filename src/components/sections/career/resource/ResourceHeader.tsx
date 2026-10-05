import type { ResourcePageContext } from "@/types/resources";

type ResourceHeaderProps = {
  context: ResourcePageContext;
  navigationOpen: boolean;
  onToggleNavigation: () => void;
};

export default function ResourceHeader({
  context,
  navigationOpen,
  onToggleNavigation,
}: ResourceHeaderProps) {
  return (
    <header className="flex h-20 shrink-0 flex-row items-center gap-10 border-b border-primary bg-panel p-5">
      <div className="hidden w-full flex-row items-center gap-10 md:flex">
        <h1 className="text-xl font-semibold text-primary">Resources</h1>
        <div className="text-xl font-semibold text-primary">|</div>
        <h1 className="flex w-full justify-center text-2xl font-bold text-text-primary">
          {context.topic ? context.topic.name : ""}
        </h1>
        <div className="w-1/11" />
      </div>

      <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center md:hidden">
        <button
          type="button"
          aria-label={
            navigationOpen
              ? "Close resource navigation"
              : "Open resource navigation"
          }
          aria-expanded={navigationOpen}
          onClick={onToggleNavigation}
          className="justify-self-start rounded-md p-2 text-text-primary hover:bg-white/10"
        >
          <svg
            aria-hidden="true"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
            />
          </svg>
        </button>
        <h1 className="max-w-[65vw] truncate text-center text-lg font-bold text-text-primary">
          {context.topic?.name ?? ""}
        </h1>
        <div />
      </div>
    </header>
  );
}
