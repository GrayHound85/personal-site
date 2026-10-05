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
    <Card className="flex flex-col rounded-card_inner border-none bg-[#1d283829] p-4 sm:p-5">
      <div className="flex flex-col gap-2 sm:gap-1">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <h2 className="min-w-0 text-xl font-semibold leading-snug text-primary-hover">
            {title}
          </h2>
          <p className="text-sm font-semibold text-text-secondary sm:shrink-0 sm:text-right sm:text-base">
            {date}
          </p>
        </div>

        <h3 className="font-semibold leading-relaxed text-text-secondary">
          {subHeading}
        </h3>
      </div>
      <DividerLine className="mt-2" />

      <ul className="mt-2 list-disc space-y-2 pl-5 leading-relaxed">
        {description.map((desc) => (
          <li key={desc}>{desc}</li>
        ))}
      </ul>
    </Card>
  );
}
