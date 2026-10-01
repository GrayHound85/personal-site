import LinkCard from "@c/ui/LinkCard";
import Image from "next/image";

type ProjectCardProps = {
  link: string;
  image: string;
  title: string;
};

export default function ProjectCard({ link, image, title }: ProjectCardProps) {
  return (
    <LinkCard
      href={link}
      className="    
            w-full
            max-w-100
            aspect-10/7
            rounded-card_inner
            relative
            overflow-hidden
            border-none
            hover:border-none"
    >
      {image && <Image src={image} alt={title} fill className="object-cover" />}

      <div className="absolute bottom-0 left-0 right-0 z-10 h-24 bg-linear-to-t from-black/75 to-transparent p-3 flex items-end">
        <h1 className="text-text-secondary font-semibold text-2xl">{title}</h1>
      </div>
    </LinkCard>
  );
}
