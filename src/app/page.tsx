import BackgroundLayout from "@c/layout/BackgroundLayout";
import PortfolioLayout from "@c/layout/PortfolioLayout";

import HeroPanel from "@c/sections/porfolio/HeroPanel";
import ProfileCard from "@c/sections/porfolio/ProfileCard";
import NavBar from "@c/ui/NavBar";
import AdminButton from "@c/sections/porfolio/AdminButton";
import ProjectCard from "@/components/sections/porfolio/ProjectCard";
import ExpandableText from "@c/ui/ExpandibleText";
import LinkButton from "@/components/ui/LinkButton";

import { projects } from "@/config/projects";
import Card from "@/components/ui/Card";

export default function LandingPage() {
  return (
    <PortfolioLayout
      profile={<ProfileCard />}
      navigation={
        <NavBar
          type="top"
          items={[
            {
              label: "About",
              targetId: "about",
            },
            {
              label: "Projects",
              targetId: "projects",
            },
            {
              label: "Experience",
              targetId: "experience",
            },
          ]}
        />
      }
      floating={<AdminButton />}
    >
      <HeroPanel id="about">
        <h2
          className="
                    text-3xl
                    font-bold
                    mb-3
                    text-text-secondary
                "
        >
          About
        </h2>

        <p className="">
          I’m a Computer Science student at the University of Edinburgh with a
          strong interest in software development, robotics, and building
          practical projects from ideas into working solutions. I enjoy
          exploring new technologies through a wide range of personal and
          university projects, while continuing to develop my skills across
          software and systems. I also have experience competing nationally and
          internationally in STEM events, including robotics and STEM Racing.
        </p>
      </HeroPanel>

      <HeroPanel id="projects" className="flex flex-row">
        <div className="flex flex-row gap-8">
          <ProjectCard
            link={projects.homelab.link}
            title={projects.homelab.title}
            image={projects.homelab.image}
          />
          <ProjectCard
            link={projects.personalSite.link}
            title={projects.personalSite.title}
            image={projects.personalSite.image}
          />
          <Card className="border-none w-100 h-70">{""}</Card>
        </div>
        <div className="flex-1" />
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-text-secondary text-right">
            Projects
          </h1>
          <LinkButton
            href="./projects"
            className="text-center text-s h-10 w-30"
          >
            View all
          </LinkButton>
        </div>
      </HeroPanel>

      <HeroPanel id="experience">
        <h1 className="text-3xl font-bold text-text-secondary">Experience</h1>
      </HeroPanel>
    </PortfolioLayout>
  );
}
