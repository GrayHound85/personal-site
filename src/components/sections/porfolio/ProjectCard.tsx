import LinkCard from "@c/ui/LinkCard";
import Image from "next/image";

type ProjectCardProps = {
  link: string;
  image: string;
  title: string;
  eager?: boolean;
};

export default function ProjectCard({
  link,
  image,
  title,
  eager = false,
}: ProjectCardProps) {
  return (
    <LinkCard
      href={link}
      className="w-full max-w-100 aspect-10/7 relative overflow-hidden rounded-card_inner border-none shadow-[0_0_36px_rgba(83,186,184,0.16)] hover:border-none"
    >
      {image && (
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, 400px"
          loading={eager ? "eager" : "lazy"}
          className="object-cover"
        />
      )}

      <div className="absolute bottom-0 left-0 right-0 z-10 h-24 bg-linear-to-t from-black/75 to-transparent p-3 flex items-end">
        <h1 className="text-text-secondary font-semibold text-2xl">{title}</h1>
      </div>
    </LinkCard>
  );
}
