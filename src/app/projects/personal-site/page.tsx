import type { Metadata } from "next";

import ProjectPageLayout from "@c/layout/ProjectPageLayout";
import type { ProjectSectionLink } from "@c/sections/projects/ProjectContentsNav";
import ProjectDetails from "@c/sections/projects/ProjectDetails";
import ProjectHeader from "@c/sections/projects/ProjectHeader";
import ProjectImage from "@c/sections/projects/ProjectImage";
import ProjectList from "@c/sections/projects/ProjectList";
import ProjectSection from "@c/sections/projects/ProjectSection";
import { getProject } from "@/config/projects";

const project = getProject("personal-site");

export const metadata: Metadata = {
  title: project.title,
  description: project.summary,
};

const sections: ProjectSectionLink[] = [
  { id: "built-today", title: "Built today" },
  { id: "architecture", title: "Architecture" },
  { id: "skills", title: "Skills developed" },
  { id: "direction", title: "Where it is going" },
];

export default function PersonalSiteProjectPage() {
  return (
    <ProjectPageLayout
      project={project}
      sections={sections}
      header={
        <ProjectHeader
          project={project}
          headline="A personal platform for building and learning in public"
          intro="A self-hosted web application that brings my public portfolio together with private tools for learning and managing personal projects. I'm building it one area at a time."
          status="Live, private tools in progress"
          github={{
            href: "https://github.com/GrayHound85/personal-site",
            label: "View source on GitHub",
          }}
        />
      }
    >
      <ProjectSection
        id="built-today"
        title="What is already built"
        label="Current state"
      >
        <p>
          The site has two halves: public pages anyone can read, and a
          password-protected workspace that only I can get into.
        </p>

        <ProjectDetails
          items={[
            {
              term: "Public portfolio",
              description:
                "The home page, the projects list, and a write-up for each project. Projects are defined in one config file, so a new one shows up on every page once it's added.",
            },
            {
              term: "Resource library",
              description:
                "The most complete private workflow. It organises learning resources by category, subcategory, and topic, with the data stored in PostgreSQL. Only an authenticated administrator can add resources.",
            },
            {
              term: "Personal workspace",
              description:
                "A dashboard linking the private areas. The career section's navigation is mapped out, but most of its pages are still early scaffolds.",
            },
          ]}
        />

        <ProjectImage
          title="Resource library structure"
          description="How categories, subcategories, topics, and resources fit together."
          src="/projects/resource_struct_diagram.png"
          width={1842}
          height={802}
        />
      </ProjectSection>

      <ProjectSection
        id="architecture"
        title="Architecture and technology"
        label="Under the hood"
      >
        <p>
          I&apos;ve built it as a full-stack system, connecting the interface to
          persistent data, authentication, and a repeatable deployment setup.
        </p>

        <ProjectList
          items={[
            {
              label: "Application",
              text: "Next.js App Router with React, using server components for data-backed pages and server actions for validated changes.",
            },
            {
              label: "Data",
              text: "Drizzle ORM over a relational schema, with checked-in migrations. Queries are separated into repository and service layers.",
            },
            {
              label: "Access",
              text: "NextAuth credentials authentication and role-based path rules keep the personal tools private while the portfolio and project pages stay public.",
            },
            {
              label: "Interface and deployment",
              text: "Tailwind CSS 4 for styling. Docker builds a standalone image, which runs alongside PostgreSQL on my homelab.",
            },
          ]}
        />

        <ProjectImage
          title="Application architecture"
          description="A request traced from the browser through Next.js, the service and repository layers, and PostgreSQL, with authentication around the private routes."
          src="/projects/personal-site_architecture.png"
          width={1850}
          height={1557}
        />
      </ProjectSection>

      <ProjectSection
        id="skills"
        title="Skills developed through the project"
        label="What I am practising"
      >
        <ProjectList
          items={[
            {
              label: "Full-stack feature development",
              text: "taking a workflow from page structure and navigation through validation, persistence, and access control.",
            },
            {
              label: "Data modelling",
              text: "designing a schema around the way I actually browse and maintain study material.",
            },
            {
              label: "Application boundaries",
              text: "separating UI, service, repository, and database concerns, while keeping private operations on the server.",
            },
            {
              label: "Product judgement",
              text: "shipping a useful foundation in stages, and being clear about what is built versus planned.",
            },
          ]}
        />
      </ProjectSection>

      <ProjectSection
        id="direction"
        title="Where the project is going"
        label="Next stages"
      >
        <p>
          The private side will grow into three areas: career tools to support
          my studies, a media server for digital copies of physical media I own,
          and finance tools for personal tracking and, later, market analysis. I
          also plan to host interactive projects here as I build them.
        </p>
      </ProjectSection>
    </ProjectPageLayout>
  );
}
