import LinkCard from "@c/ui/LinkCard";

export type WorkspaceCardProps = {
  href: string;
  name: string;
  description: string;
  // Shows a "planned" badge for tools that aren't built yet
  planned?: boolean;
};

// A link to one area or tool in the private workspace (dashboard, career).
// Styled like the pinned project cards on the home page.
export default function WorkspaceCard({
  href,
  name,
  description,
  planned = false,
}: WorkspaceCardProps) {
  return (
    <LinkCard
      href={href}
      className="flex flex-col rounded-card_inner p-5 hover:scale-[1.01]"
    >
      <div className="flex items-center gap-3">
        <h3 className="font-mono font-semibold text-primary">{name}</h3>
        {planned && (
          <span className="ml-auto rounded-full border border-white/20 px-2 font-mono text-xs text-text-secondary">
            planned
          </span>
        )}
      </div>

      <p className="mt-3 text-sm leading-relaxed text-text-secondary">
        {description}
      </p>
    </LinkCard>
  );
}
