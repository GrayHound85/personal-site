import LinkButton from "@c/ui/LinkButton";
import RepoPanel from "@c/ui/RepoPanel";
import EditButton from "./EditButton";

type ResourceTopicDescriptionProps = {
  description: string | null;
  notesHref: string;
  topicName: string;
  // Opens the edit topic form
  onEdit: () => void;
};

export default function ResourceTopicDescription({
  description,
  notesHref,
  topicName,
  onEdit,
}: ResourceTopicDescriptionProps) {
  const summary = description?.trim() || "No summary has been added yet.";

  return (
    <RepoPanel
      title="summary"
      action={
        <div className="flex items-center gap-2">
          <EditButton label={`Edit ${topicName}`} onClick={onEdit} />
          <LinkButton href={notesHref} className="h-8 px-4 py-0 text-sm">
            Notes
          </LinkButton>
        </div>
      }
    >
      <p className="leading-relaxed text-text-secondary">{summary}</p>
    </RepoPanel>
  );
}
