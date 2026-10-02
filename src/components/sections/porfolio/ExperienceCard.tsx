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
    <Card className="flex flex-col rounded-card_inner p-5 border-none bg-[#1d283829]">
      <div className="flex flex-col gap-1">
        <div className="flex flex-row">
          <h2 className="text-xl text-primary-hover font-semibold">{title}</h2>
          <div className="flex-1" />
          <p className="text-text-secondary font-semibold">{date}</p>
        </div>

        <div className="flex-1" />
        <h3 className="font-semibold text-text-secondary">{subHeading}</h3>
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
