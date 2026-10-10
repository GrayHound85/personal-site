import BackgroundLayout from "@c/layout/BackgroundLayout";
import PortfolioLayout from "@c/layout/PortfolioLayout";

import HeroPanel from "@c/sections/porfolio/HeroPanel";
import ProfileCard from "@c/sections/porfolio/ProfileCard";
import NavBar from "@c/ui/NavBar";
import AdminButton from "@c/sections/porfolio/AdminButton";
import ProjectCard from "@/components/sections/porfolio/ProjectCard";
import AwardCard from "@/components/sections/porfolio/AwardCard";
import ExpandableText from "@c/ui/ExpandibleText";
import LinkButton from "@/components/ui/LinkButton";
import ExperienceCard from "@/components/sections/porfolio/ExperienceCard";

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
              label: "Awards",
              targetId: "awards",
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

        <p className="space-y-3 sm:space-y-0">
          <span className="block sm:inline">
            I’m a Computer Science student at the University of Edinburgh with a
            strong interest in software development, robotics, and building
            practical projects from ideas into working solutions.
          </span>{" "}
          <span className="block sm:inline">
            I enjoy exploring new technologies through a wide range of personal
            and university projects, while continuing to develop my skills
            across software and systems.
          </span>{" "}
          <span className="block sm:inline">
            I also have experience competing nationally and internationally in
            STEM events, including robotics and STEM Racing.
          </span>
        </p>
      </HeroPanel>

      <HeroPanel
        id="projects"
        className="flex flex-col gap-4 p-4 sm:p-5 lg:flex-row lg:p-8"
      >
        <div className="flex flex-row gap-2 lg:hidden">
          <LinkButton
            href="./projects"
            className="text-center text-s h-10 w-30"
          >
            View all
          </LinkButton>
          <div className="flex-1" />
          <h1 className="text-3xl font-bold text-text-secondary text-right ">
            Projects
          </h1>
        </div>
        <div className="grid gap-8 min-[1500px]:grid-cols-2 min-[1900px]:grid-cols-3 w-full">
          <ProjectCard
            link={projects.homelab.link}
            title={projects.homelab.title}
            icon={projects.homelab.icon}
            eager
          />
          <ProjectCard
            link={projects.personalSite.link}
            title={projects.personalSite.title}
            icon={projects.personalSite.icon}
          />
          <Card className="border-none w-100 h-70 hidden min-[1900px]:block">
            {""}
          </Card>
        </div>
        <div className="hidden flex-1 lg:block" />
        <div className="lg:flex flex-col gap-2 hidden">
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

      <HeroPanel id="awards" className="flex flex-col gap-5 p-5 lg:p-8">
        <h1 className="text-3xl font-bold text-text-secondary">Awards</h1>
        <div className="grid grid-cols-1 min-[1500px]:grid-cols-2 gap-8">
          <AwardCard
            title="STEM Racing"
            subHeading="2nd place UK National finals + Best display"
            date="Feb 2024"
            description={[
              "Was head of branding winning multiple awards for our display at both regional and national competitions.",
            ]}
          />
          <AwardCard
            title="Vex Robotics V5"
            subHeading="World championship qualifiers"
            date="Apr 2026"
            description={[
              "Our team won the programming award at the UK National finals which qualified us to compete in the USA later that year.",
            ]}
          />
        </div>
      </HeroPanel>

      <HeroPanel id="experience" className="flex flex-col gap-5 p-5 lg:p-8">
        <h1 className="text-3xl font-bold text-text-secondary">Experience</h1>
        <ExperienceCard
          title="Audio and Visual lead"
          subHeading="University Of Edinburgh Satellite Instrument Development Project"
          date="Sep 2024 – Nov 2025 (Part time)"
          description={[
            "Worked on creating simple to understand computer graphics to deliver complex information to investors and scientific audiences.",
            "Worked with data from proprietary end to end instrument model and transformed it to deliver impact full metrics.",
            "Worked to create graphics to bring across important information in funcding proposals to the European Space Agency (ESA)",
          ]}
        />
        <ExperienceCard
          title="Placement week at LUMC IT Infrastructure"
          subHeading="LUMC (Leiden University Medical Center)"
          date="Nov 2025"
          description={[
            "Followed different teams including DevOps to see the day to day operations of computing behind one of the biggest hospitals in the Netherlands",
            "Got a much deeper insight into how infrastructure change when handling huge quantities of data.",
            "Learned about their migration project to move the hospitals infrastructure to more modern data warehouse solution.",
          ]}
        />
      </HeroPanel>
    </PortfolioLayout>
  );
}
