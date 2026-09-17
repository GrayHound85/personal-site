import Card from "@/components/ui/Card";
import DividerLine from "@/components/ui/DividerLine";
import LinkButton from "@/components/ui/LinkButton";

type ResourceTopicDescriptionProps = {
  description: string;
  notesSlug: string[] | undefined;
};

export default function ResourceTopicDescription({
  description,
  notesSlug,
}: ResourceTopicDescriptionProps) {
  return (
    <Card className="w-full p-6 h-50">
      <div className="flex flex-col ">
        <div className="flex flex-row">
          <h3 className="text-lg font-semibold text-text-secondary">Summery</h3>
          <LinkButton
            href={`/notes/${notesSlug?.[0]}/${notesSlug?.[1]}`}
            className="ml-auto text-sm"
          >
            Edit notes
          </LinkButton>
        </div>

        <DividerLine />
        <p className="text-text-primary text-lg truncate">{description}</p>
      </div>
    </Card>
  );
}
