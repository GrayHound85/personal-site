import type { Metadata } from "next";
import Link from "next/link";

import BackgroundLayout from "@/components/layout/BackgroundLayout";
import ProjectContentsNav, {
  type ProjectSectionLink,
} from "@/components/sections/projects/ProjectContentsNav";
import ProjectImagePlaceholder from "@c/sections/projects/ProjectImagePlaceholder";
import ProjectFact from "@c/sections/projects/ProjectFact";

export const metadata: Metadata = {
  title: "Personal Site | Projects",
  description:
    "An overview of the personal web platform, its current features, architecture, and next steps.",
};

const sections: ProjectSectionLink[] = [
  { id: "built-today", title: "Built today" },
  { id: "architecture", title: "Architecture" },
  { id: "skills", title: "Skills developed" },
  { id: "direction", title: "Where it is going" },
];

const overviewFacts = [
  { label: "Current focus", value: "Portfolio and learning tools" },
  { label: "Core stack", value: "Next.js, TypeScript, PostgreSQL" },
  {
    label: "Hosting",
    value: "Self-hosted on my homelab + CloudFlare",
  },
];

export default function PersonalSiteProjectPage() {
  return (
    <BackgroundLayout background="subtle">
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

              <header className="border-b border-border py-8 sm:py-10">
                <p className="mb-3 text-sm font-semibold uppercase text-primary">
                  Personal project
                </p>
                <h1 className="max-w-4xl text-4xl font-bold text-text-primary sm:text-5xl">
                  A personal platform for building and learning in public
                </h1>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-text-secondary">
                  I am developing a self-hosted web application that brings my
                  public portfolio together with private tools for learning and
                  managing personal projects. The portfolio and foundations are
                  in place, and the resource library is the clearest example of
                  a complete data-backed workflow; other areas are being built
                  incrementally.
                </p>

                <dl className="mt-8 grid gap-5 sm:grid-cols-3">
                  {overviewFacts.map((fact) => (
                    <ProjectFact key={fact.label} {...fact} />
                  ))}
                </dl>
              </header>
            </>
          }
        >
          <article className="min-w-0 max-w-4xl space-y-12">
            <section id="built-today" className="scroll-mt-20 lg:scroll-mt-8">
              <p className="text-sm font-semibold uppercase text-primary">
                Current state
              </p>
              <h2 className="mt-2 text-2xl font-bold text-text-primary">
                What is already built
              </h2>
              <p className="mt-3 leading-7 text-text-secondary">
                The application has a public portfolio and a separate,
                password-protected workspace. The codebase also contains planned
                destinations whose product features are not complete yet; the
                distinction matters because this is an active project, not a
                finished suite of tools.
              </p>

              <dl className="mt-6 divide-y divide-border border-y border-border">
                <div className="grid gap-2 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <dt className="font-semibold text-text-primary">
                    Public portfolio
                  </dt>
                  <dd className="leading-7 text-text-secondary">
                    A homepage presents my profile, experience, awards, and
                    project links. The projects area is public, so individual
                    project write-ups can be read without access to the private
                    workspace.
                  </dd>
                </div>
                <div className="grid gap-2 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <dt className="font-semibold text-text-primary">
                    Resource library
                  </dt>
                  <dd className="leading-7 text-text-secondary">
                    The most developed private workflow organises learning
                    resources by category, subcategory, and topic, then displays
                    the associated links. Resource data is stored in PostgreSQL;
                    adding resources is restricted to an authenticated
                    administrator.
                  </dd>
                </div>
                <div className="grid gap-2 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <dt className="font-semibold text-text-primary">
                    Personal workspace
                  </dt>
                  <dd className="leading-7 text-text-secondary">
                    The dashboard groups the planned career, media, and finance
                    areas. Career navigation already maps out tools for study
                    and professional development, while most of those pages
                    remain early scaffolds. Media and finance currently have
                    their section entry pages rather than complete workflows.
                  </dd>
                </div>
              </dl>
              <div className="mt-6">
                <ProjectImagePlaceholder
                  title="Resource library structure"
                  description="A diagram showing how categories, subcategories, topics, and resources fit together."
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
              <p className="mt-3 leading-7 text-text-secondary">
                I have been building the application as a full-stack system,
                connecting the interface to persistent data, authentication, and
                a repeatable deployment setup.
              </p>
              <ul className="mt-5 space-y-3 leading-7 text-text-secondary">
                <li>
                  <strong className="text-text-primary">Application:</strong>{" "}
                  Next.js App Router with React and TypeScript, using server
                  components for data-backed pages and server actions for
                  validated changes.
                </li>
                <li>
                  <strong className="text-text-primary">Data:</strong>{" "}
                  PostgreSQL with Drizzle ORM, a relational schema, and
                  checked-in database migrations. Resource queries are separated
                  into repository and service layers.
                </li>
                <li>
                  <strong className="text-text-primary">Access:</strong>{" "}
                  NextAuth credentials authentication and role-based path access
                  keep personal tools private while the portfolio and project
                  pages remain public.
                </li>
                <li>
                  <strong className="text-text-primary">
                    Interface and deployment:
                  </strong>{" "}
                  Tailwind CSS 4 for responsive styling; Docker builds a
                  standalone application image, with Compose defining the
                  PostgreSQL service. The site runs on my homelab.
                </li>
              </ul>
              <div className="mt-6">
                <ProjectImagePlaceholder
                  title="Application architecture"
                  description="A system diagram tracing a request from the browser through Next.js, the service and repository layers, and PostgreSQL, with authentication around private routes."
                />
              </div>
            </section>

            <section id="skills" className="scroll-mt-20 lg:scroll-mt-8">
              <p className="text-sm font-semibold uppercase text-primary">
                What I am practising
              </p>
              <h2 className="mt-2 text-2xl font-bold text-text-primary">
                Skills developed through the project
              </h2>
              <ul className="mt-5 space-y-4 leading-7 text-text-secondary">
                <li>
                  <strong className="text-text-primary">
                    Full-stack feature development:
                  </strong>{" "}
                  taking a workflow from page structure and navigation through
                  validation, persistence, and access control.
                </li>
                <li>
                  <strong className="text-text-primary">Data modelling:</strong>{" "}
                  representing categories, topics, resources, and their
                  relationships in a schema that supports the way I browse and
                  maintain study material.
                </li>
                <li>
                  <strong className="text-text-primary">
                    Application boundaries:
                  </strong>{" "}
                  separating UI, service, repository, and database concerns,
                  while keeping private operations on the server.
                </li>
                <li>
                  <strong className="text-text-primary">
                    Product judgement:
                  </strong>{" "}
                  shipping a useful foundation in stages, keeping public
                  portfolio content clear, and being explicit about what is
                  implemented versus planned.
                </li>
              </ul>
            </section>

            <section id="direction" className="scroll-mt-20 lg:scroll-mt-8">
              <p className="text-sm font-semibold uppercase text-primary">
                Next stages
              </p>
              <h2 className="mt-2 text-2xl font-bold text-text-primary">
                Where the project is going
              </h2>
              <p className="mt-3 leading-7 text-text-secondary">
                The longer-term structure has three personal areas: career tools
                to support my studies, a media server for digital copies of
                physical media I own, and finance tools for personal tracking
                and future market analysis. These are plans, not features I am
                presenting as complete.
              </p>
              <p className="mt-3 leading-7 text-text-secondary">
                I also plan to host interactive projects here as they are built.
                That lets the site grow into a practical home for my work, while
                keeping the personal workspace available only to me.
              </p>
            </section>
          </article>
        </ProjectContentsNav>
      </div>
    </BackgroundLayout>
  );
}
