import BackgroundLayout from "@/components/layout/BackgroundLayout";
import PortfolioLayout from "@/components/layout/PortfolioLayout";

import HeroPanel from "@/components/sections/porfolio/HeroPanel";
import ProfileCard from "@/components/sections/porfolio/ProfileCard";
import NavBar from "@/components/ui/NavBar";
import AdminButton from "@/components/sections/porfolio/AdminButton";
import ExpandableText from "@/components/ui/ExpandibleText";

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
                    mb-6
                    text-text-secondary
                "
        >
          About
        </h2>

        <ExpandableText>
          <p className="mb-4">
            I'm a Computer Science student with a strong interest in software
            development, robotics, and building practical technology. I enjoy
            taking ideas from concept to working projects and am particularly
            interested in developing my skills across both software and systems.
          </p>

          <p className="mb-4">
            My experience extends beyond university projects. During the 2023–24
            STEM Racing season, I placed 2nd in the UK in the Development Class
            and was the primary individual responsible for developing our team's
            pit displays. The display won Best Pit Display in both the
            Professional and Development Classes, as well as Best Display at the
            UK National Finals.
          </p>

          <p className="mb-4">
            I have also competed internationally in VEX Robotics V5, where my
            team reached the World Finals in Missouri, USA after winning the
            Think Award, recognising our programming and technical development.
          </p>

          <p className="mb-4">
            Alongside my studies, I am currently developing STEM Hub Scotland, a
            full-stack platform designed to connect students, teachers,
            volunteers, and organisations with STEM opportunities and events
            across Scotland. This project has given me the opportunity to apply
            my software development skills to a larger, real-world application.
          </p>

          <p>
            I am comfortable working with languages including Python,
            JavaScript/TypeScript, Java, C#, GDScript, and Lua, and have
            experience with technologies such as React, Next.js, databases, and
            Linux. I am particularly keen to continue improving my C++ skills,
            with a long-term interest in becoming more confident developing
            high-performance and systems-oriented software.
          </p>
        </ExpandableText>
      </HeroPanel>

      <HeroPanel id="projects">
        <h1 className="text-3xl font-bold text-text-secondary">Projects</h1>
      </HeroPanel>

      <HeroPanel id="experience">
        <h1 className="text-3xl font-bold text-text-secondary">Experience</h1>
      </HeroPanel>
    </PortfolioLayout>
  );
}
