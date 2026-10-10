import LinkCard from "@c/ui/LinkCard";
import Image from "next/image";
import type { ComponentType, SVGProps } from "react";

import BookIcon from "@/components/icons/BooksIcon";
import CopyIcon from "@/components/icons/CopyIcon";
import DocsIcon from "@/components/icons/DocsIcon";
import GithubIcon from "@/components/icons/GithubIcon";
import ArrowIcon from "@/components/icons/ArrowIcon";
import LeetcodeIcon from "@/components/icons/LeetcodeIcon";
import LinkedinIcon from "@/components/icons/LinkedinIcon";
import PersonalSiteIcon from "@/components/icons/PersonalSiteIcon";
import ServerIcon from "@/components/icons/ServerIcon";
import TickIcon from "@/components/icons/TickIcon";
import VideoIcon from "@/components/icons/VideoIcon";
import WebIcon from "@/components/icons/WebIcon";
import type { ProjectCardIconOptions, ProjectIconName } from "@/types/projects";

function ProjectArrowIcon(props: SVGProps<SVGSVGElement>) {
  return <ArrowIcon {...props} direction="up" />;
}

const projectIcons: Record<
  ProjectIconName,
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  books: BookIcon,
  copy: CopyIcon,
  docs: DocsIcon,
  github: GithubIcon,
  leetcode: LeetcodeIcon,
  arrow: ProjectArrowIcon,
  linkedin: LinkedinIcon,
  PersonalSiteIcon,
  ServerIcon,
  tick: TickIcon,
  video: VideoIcon,
  web: WebIcon,
};

type ProjectCardProps = {
  link: string;
  image?: string;
  icon?: ProjectCardIconOptions;
  title: string;
  eager?: boolean;
};

export default function ProjectCard({
  link,
  image,
  icon,
  title,
  eager = false,
}: ProjectCardProps) {
  const Icon = icon ? projectIcons[icon.name] : null;
  const iconColor = icon
    ? icon.invert
      ? icon.backgroundColor
      : icon.foregroundColor
    : undefined;
  const iconBackground = icon
    ? icon.invert
      ? icon.foregroundColor
      : icon.backgroundColor
    : undefined;

  return (
    <LinkCard
      href={link}
      className="w-full max-w-100 aspect-10/7 relative overflow-hidden rounded-card_inner border-none shadow-[0_0_36px_rgba(83,186,184,0.16)] hover:border-none"
    >
      {Icon ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center"
          style={{ backgroundColor: iconBackground }}
        >
          <Icon
            aria-hidden="true"
            focusable="false"
            className="-translate-y-4 sm:-translate-y-6"
            style={{
              color: iconColor,
              width: "clamp(8rem, 38%, 11rem)",
              height: "clamp(8rem, 38%, 11rem)",
            }}
          />
        </div>
      ) : image ? (
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, 400px"
          loading={eager ? "eager" : "lazy"}
          className="object-cover"
        />
      ) : null}

      <div className="absolute bottom-0 left-0 right-0 z-10 flex h-15 items-end bg-action p-3">
        <h1 className="text-text-secondary font-semibold text-2xl">{title}</h1>
      </div>
    </LinkCard>
  );
}
