
import type { Metadata } from "next";
import Link from "next/link";

import BackgroundLayout from "@/components/layout/BackgroundLayout";
import ProjectContentsNav, {
  type ProjectSectionLink,
} from "@/components/sections/projects/ProjectContentsNav";
import ProjectImagePlaceholder from "@c/sections/projects/ProjectImagePlaceholder";
import ProjectFact from "@c/sections/projects/ProjectFact";
import Card from "@/components/ui/Card";
import GithubIcon from "@/components/icons/GithubIcon";

export const metadata: Metadata = {
  description:
    "An overview of my self-built homelab, custom 3D-printed server case, and self-hosted infrastructure.",
};

const sections: ProjectSectionLink[] = [
  { id: "hardware", title: "Hardware and case" },
  { id: "architecture", title: "Architecture" },
  { id: "skills", title: "Skills developed" },
  { id: "direction", title: "Where it is going" },
];

const overviewFacts = [
  { label: "Current focus", value: "Self-hosted infrastructure" },
  { label: "Core stack", value: "Ubuntu Server, Docker, Cloudflare Tunnels" },
  { label: "Hosting", value: "Personal website and future projects" },
];

export default function HomeLabProjectPage() {
  return (
    <BackgroundLayout background="plain">
      <div className="mx-auto w-full max-w-7xl px-4 pt-16 pb-6 sm:px-6 lg:px-8 lg:py-10">
        <ProjectContentsNav
          backHref="/projects"
          sections={sections}
          intro={
            <>
              <Link
                href="/projects"
                className="hidden text-sm text-text-secondary transition-colors hover:text-primary lg:inline-flex"
              >
                Back to projects
              </Link>

              <Card className="mt-5 border-none bg-panel/50 p-5 sm:p-7">
                <header>
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm font-semibold uppercase text-primary">
                      Personal project
                    </p>
                    <a
                      href="https://github.com/GrayHound85"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex shrink-0 items-center gap-2 rounded-button bg-action px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      <GithubIcon aria-hidden="true" className="h-4 w-4" />
                      <span>View GitHub profile</span>
                    </a>
                  </div>
                  <h1 className="max-w-4xl text-4xl font-bold text-text-primary sm:text-5xl">
                    A self-built homelab for hosting and deploying projects
                  </h1>
                  <p className="mt-5 max-w-3xl text-lg leading-8 text-text-secondary">
                    I built my own server and designed, modelled, and
                    3D-printed a custom rack-style case to house it. Running
                    Ubuntu Server and Docker, the homelab hosts my personal
                    website and provides a platform for deploying future
                    projects while developing my practical experience with
                    Linux, networking, and infrastructure.
                  </p>

                  <dl className="mt-8 grid gap-5 sm:grid-cols-3">
                    {overviewFacts.map((fact) => (
                      <ProjectFact key={fact.label} {...fact} />
                    ))}
                  </dl>
                </header>
              </Card>
            </>
          }
        >
          <article className="min-w-0 max-w-4xl space-y-12">
            <section id="hardware" className="scroll-mt-20 lg:scroll-mt-8">
              <p className="text-sm font-semibold uppercase text-primary">
                Built from the ground up
              </p>
              <h2 className="mt-2 text-2xl font-bold text-text-primary">
                Hardware and custom case
              </h2>
              <Card className="mt-5 border-none bg-panel/50 p-4 sm:p-6">
                <p className="leading-7 text-text-secondary">
                  I assembled the server hardware myself, using a Gigabyte
                  A520M DS3H V2 motherboard and an AMD Ryzen 5 3600 processor.
                  I also designed the enclosure rather than using a
                  pre-built case: I modelled the assembly in Fusion 360 and
                  3D-printed the components to fit the hardware and networking
                  equipment.
                </p>

                <dl className="mt-6 divide-y divide-border border-y border-border">
                  <div className="grid gap-2 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
                    <dt className="font-semibold text-text-primary">
                      Server hardware
                    </dt>
                    <dd className="leading-7 text-text-secondary">
                      A self-assembled system built around an AMD Ryzen 5 3600
                      and Gigabyte A520M DS3H V2 motherboard, running Ubuntu
                      Server without a desktop environment.
                    </dd>
                  </div>
                  <div className="grid gap-2 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
                    <dt className="font-semibold text-text-primary">
                      CAD design
                    </dt>
                    <dd className="leading-7 text-text-secondary">
                      Designed and modelled the custom rack-style enclosure in
                      Fusion 360, working around component dimensions and
                      allowing space for rear cables.
                    </dd>
                  </div>
                  <div className="grid gap-2 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
                    <dt className="font-semibold text-text-primary">
                      Fabrication
                    </dt>
                    <dd className="leading-7 text-text-secondary">
                      3D-printed the case components, considering practical
                      constraints such as airflow, hardware access, and space
                      for networking equipment.
                    </dd>
                  </div>
                </dl>
              </Card>

              <div className="mt-6">
                <ProjectImagePlaceholder
                  title="Fusion 360 case assembly"
                  description="A screenshot of the Fusion 360 assembly showing the custom server enclosure and how its components fit together."
                  image="/projects/homelab_fusion_assembly.png"
                />
              </div>

              <div className="mt-6">
                <ProjectImagePlaceholder
                  title="Finished homelab server"
                  description="A photograph of the completed server in its custom-designed and 3D-printed enclosure."
                  image="/projects/homelab_finished_server.jpg"
                />
              </div>
            </section>

            <section id="architecture" className="scroll-mt-20 lg:scroll-mt-8">
              <p className="text-sm font-semibold uppercase text-primary">
                Under the hood
              </p>
              <h2 className="mt-2 text-2xl font-bold text-text-primary">
                Architecture and technology
              </h2>
              <Card className="mt-5 border-none bg-panel/50 p-4 sm:p-6">
                <p className="leading-7 text-text-secondary">
                  The homelab provides a headless Linux environment for running
                  applications and services. Docker and Docker Compose keep
                  services separated into containers, while remote access and
                  an automated image build process make it practical to
                  maintain the applications hosted on the server.
                </p>
                <ul className="mt-5 space-y-3 leading-7 text-text-secondary">
                  <li>
                    <strong className="text-text-primary">
                      Operating system:
                    </strong>{" "}
                    Ubuntu Server, administered remotely over SSH without a
                    desktop environment.
                  </li>
                  <li>
                    <strong className="text-text-primary">
                      Containerisation:
                    </strong>{" "}
                    Docker and Docker Compose run applications and supporting
                    services independently, making deployments easier to
                    configure and maintain.
                  </li>
                  <li>
                    <strong className="text-text-primary">
                      Website deployment:
                    </strong>{" "}
                    My personal website runs on the homelab in a Docker
                    container, with PostgreSQL running as a separate service.
                    GitHub Actions builds the application image and publishes
                    it to GitHub Container Registry (GHCR) for deployment.
                  </li>
                  <li>
                    <strong className="text-text-primary">
                      Remote access:
                    </strong>{" "}
                    Cloudflare Tunnels provide access to configured services
                    through hostnames without requiring inbound ports to be
                    opened on my home router. SSH is used for remote server
                    administration.
                  </li>
                  <li>
                    <strong className="text-text-primary">
                      Hardware and fabrication:
                    </strong>{" "}
                    AMD Ryzen 5 3600, Gigabyte A520M DS3H V2, Fusion 360, and
                    3D printing.
                  </li>
                </ul>
              </Card>
            </section>

            <section id="skills" className="scroll-mt-20 lg:scroll-mt-8">
              <p className="text-sm font-semibold uppercase text-primary">
                What I am practising
              </p>
              <h2 className="mt-2 text-2xl font-bold text-text-primary">
                Skills developed through the project
              </h2>
              <Card className="mt-5 border-none bg-panel/50 p-4 sm:p-6">
                <ul className="space-y-4 leading-7 text-text-secondary">
                  <li>
                    <strong className="text-text-primary">
                      Linux systems administration:
                    </strong>{" "}
                    installing and maintaining a headless Ubuntu Server
                    environment and administering it remotely over SSH.
                  </li>
                  <li>
                    <strong className="text-text-primary">
                      Deployment and containerisation:
                    </strong>{" "}
                    running services with Docker Compose and using a
                    GitHub Actions and GHCR workflow to build and distribute
                    application images.
                  </li>
                  <li>
                    <strong className="text-text-primary">
                      Networking and remote access:
                    </strong>{" "}
                    configuring Cloudflare Tunnels and hostnames to make
                    selected self-hosted services accessible remotely.
                  </li>
                  <li>
                    <strong className="text-text-primary">
                      Hardware and CAD:
                    </strong>{" "}
                    assembling a computer from individual components, modelling
                    a custom enclosure in Fusion 360, and manufacturing it
                    through 3D printing.
                  </li>
                  <li>
                    <strong className="text-text-primary">
                      Troubleshooting:
                    </strong>{" "}
                    diagnosing issues across the server, container
                    configuration, application builds, and network access.
                  </li>
                </ul>
              </Card>
            </section>

            <section id="direction" className="scroll-mt-20 lg:scroll-mt-8">
              <p className="text-sm font-semibold uppercase text-primary">
                Next stages
              </p>
              <h2 className="mt-2 text-2xl font-bold text-text-primary">
                Where the project is going
              </h2>
              <p className="mt-3 leading-7 text-text-secondary">
                The homelab is an ongoing project that will provide hosting
                for my future applications and experiments with self-hosted
                services. Rather than treating each project as a separate
                deployment, I want to use this server as a shared platform for
                running and maintaining the software I build.
              </p>
              <p className="mt-3 leading-7 text-text-secondary">
                As the setup develops, I plan to explore further automation,
                additional services, and ways to manage deployments centrally.
                This gives me a practical environment to develop skills across
                hardware, Linux, networking, and application infrastructure.
              </p>
            </section>
          </article>
        </ProjectContentsNav>
      </div>
    </BackgroundLayout>
  );
}