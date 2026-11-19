import type { Metadata } from "next";

import ProjectPageLayout from "@c/layout/ProjectPageLayout";
import type { ProjectSectionLink } from "@c/sections/projects/ProjectContentsNav";
import ProjectDetails from "@c/sections/projects/ProjectDetails";
import ProjectHeader from "@c/sections/projects/ProjectHeader";
import ProjectImage from "@c/sections/projects/ProjectImage";
import ProjectList from "@c/sections/projects/ProjectList";
import ProjectSection from "@c/sections/projects/ProjectSection";
import { getProject } from "@/config/projects";

const project = getProject("homelab");

export const metadata: Metadata = {
  title: project.title,
  description: project.summary,
};

const sections: ProjectSectionLink[] = [
  { id: "hardware", title: "Hardware and case" },
  { id: "architecture", title: "Architecture" },
  { id: "skills", title: "Skills developed" },
  { id: "direction", title: "Where it is going" },
];

export default function HomeLabProjectPage() {
  return (
    <ProjectPageLayout
      project={project}
      sections={sections}
      header={
        <ProjectHeader
          project={project}
          headline="A self-built homelab for hosting and deploying projects"
          intro="I built my own server and designed, modelled, and 3D-printed a rack-style case to house it. It's the platform I deploy my projects to, including this website."
          status="Live, hosting this site"
          github={{
            href: "https://github.com/GrayHound85",
            label: "View GitHub profile",
          }}
        />
      }
    >
      <ProjectSection
        id="hardware"
        title="Hardware and custom case"
        label="Built from the ground up"
      >
        <p>
          I assembled the server myself and designed the enclosure rather than
          buying a pre-built case, so the case is shaped around the exact
          hardware and networking equipment it holds.
        </p>

        <ProjectDetails
          items={[
            {
              term: "Server hardware",
              description:
                "AMD Ryzen 5 3600 on a Gigabyte A520M DS3H V2 motherboard.",
            },
            {
              term: "CAD design",
              description:
                "Modelled in Fusion 360 around the component dimensions, leaving room for rear cables.",
            },
            {
              term: "Fabrication",
              description:
                "3D-printed in parts, with airflow, hardware access, and space for the networking equipment in mind.",
            },
          ]}
        />

        <ProjectImage
          title="Fusion 360 case assembly"
          description="The case assembly in Fusion 360, showing how the printed parts fit together."
          src="/projects/homelab_fusion_assembly.png"
          width={2057}
          height={1137}
        />

        <ProjectImage
          title="Finished homelab server"
          description="The finished server in its printed case."
          src="/projects/homelab_finished_server.jpg"
          width={4096}
          height={2304}
        />
      </ProjectSection>

      <ProjectSection
        id="architecture"
        title="Architecture and technology"
        label="Under the hood"
      >
        <p>
          The server runs headless, and everything on it runs in containers, so
          services stay isolated and can be updated independently.
        </p>

        <ProjectList
          items={[
            {
              label: "Operating system",
              text: "Ubuntu Server with no desktop environment, administered remotely over SSH.",
            },
            {
              label: "Containers",
              text: "Docker Compose runs each application alongside its supporting services, like the PostgreSQL database behind this site.",
            },
            {
              label: "Deployment",
              text: "GitHub Actions builds the site's Docker image and publishes it to GitHub Container Registry (GHCR) for deployment.",
            },
            {
              label: "Remote access",
              text: "Cloudflare Tunnels expose selected services on their own hostnames without opening any inbound ports on my home router.",
            },
          ]}
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
              label: "Linux systems administration",
              text: "installing, maintaining, and remotely managing a headless server.",
            },
            {
              label: "Deployment and containerisation",
              text: "structuring services with Docker Compose and building images in CI.",
            },
            {
              label: "Networking and remote access",
              text: "setting up tunnels and hostnames so selected services are reachable from outside my home network.",
            },
            {
              label: "Hardware and CAD",
              text: "building a computer from individual parts and designing a case to fit it.",
            },
            {
              label: "Troubleshooting",
              text: "diagnosing issues across the server, container configuration, application builds, and network access.",
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
          The homelab is meant to be a shared platform: rather than setting up a
          separate deployment for every project, everything I build runs here.
          Next I want to add more self-hosted services and automate more of how
          deployments are managed.
        </p>
      </ProjectSection>
    </ProjectPageLayout>
  );
}
