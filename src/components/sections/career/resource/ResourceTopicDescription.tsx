import LinkButton from "@c/ui/LinkButton";
import RepoPanel from "@c/ui/RepoPanel";

type ResourceTopicDescriptionProps = {
  description: string | null;
  notesHref: string;
};

export default function ResourceTopicDescription({
  description,
  notesHref,
}: ResourceTopicDescriptionProps) {
  const summary = description?.trim() || "No summary has been added yet.";

  return (
    <RepoPanel
      title="summary"
      action={
        <LinkButton href={notesHref} className="h-8 px-4 py-0 text-sm">
          Notes
        </LinkButton>
      }
    >
      <p className="leading-relaxed text-text-secondary">{summary}</p>
    </RepoPanel>
  );
}
