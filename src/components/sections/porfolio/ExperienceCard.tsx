import Card from "@c/ui/Card";
import DividerLine from "@/components/ui/DividerLine";

type ExperienceCardProps = {
  title: string;
  subHeading: string;
  date: string;
  description: string[];
};

export default function ExperienceCard({
  title,
  subHeading,
  date,
  description,
}: ExperienceCardProps) {
  return (
    <Card className="flex flex-col rounded-card_inner border-none bg-panel/50 p-4 sm:p-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start sm:gap-6">
        <div className="w-fit max-w-full">
          <h2 className="w-fit max-w-full text-xl font-semibold leading-snug text-text-primary">
            {title}
          </h2>
          <div
            aria-hidden="true"
            className="mt-3 h-0.5 w-full rounded-full bg-primary"
          />
          <h3 className="mt-2 w-fit max-w-full leading-relaxed text-text-secondary">
            {subHeading}
          </h3>
        </div>
        <p className="text-sm font-semibold text-text-secondary sm:shrink-0 sm:text-right">
          {date}
        </p>
      </div>
      <DividerLine className="mt-4" />

      <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed marker:text-primary">
        {description.map((desc) => (
          <li key={desc}>{desc}</li>
        ))}
      </ul>
    </Card>
  );
}
