import Card from "@c/ui/Card";
import DividerLine from "@/components/ui/DividerLine";
import { point } from "drizzle-orm/pg-core";

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
    <Card className="flex flex-col rounded-card_inner p-5 border-border/40">
      <div className="flex flex-row gap-5">
        <h2 className="text-xl text-primary-hover font-semibold">{title}</h2>
        <div className="flex-1" />
        <h3>{subHeading}</h3>
        <div>|</div>
        <p className="text-text-secondary font-semibold">{date}</p>
      </div>
      <DividerLine className="mt-2" />

      <ul className="list-disc pl-5">
        {description.map((desc) => (
          <li key={desc}>{desc}</li>
        ))}
      </ul>
    </Card>
  );
}
