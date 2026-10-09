import Card from "@c/ui/Card";
import DividerLine from "@/components/ui/DividerLine";

type AwardCardProps = {
  title: string;
  subHeading: string;
  date: string;
  description: string[];
};

export default function AwardCard({
  title,
  subHeading,
  date,
  description,
}: AwardCardProps) {
  return (
    <Card className="flex flex-col rounded-card_inner border-none bg-panel/50 p-4 sm:p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 className="min-w-0 text-xl font-semibold leading-snug text-text-primary">
          {title}
        </h2>
        <p className="shrink-0 text-sm font-semibold text-text-secondary">
          {date}
        </p>
      </div>
      <h3 className="mt-3 border-l-2 border-primary pl-4 font-medium leading-relaxed text-text-primary">
        {subHeading}
      </h3>
      <DividerLine className="mt-4" />
      <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
        {description.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Card>
  );
}
