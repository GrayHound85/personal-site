import type { Metadata } from "next";
import Link from "next/link";

import PortfolioLayout from "@c/layout/PortfolioLayout";
import ProfileCard from "@c/sections/porfolio/ProfileCard";
import LogEntry, { type LogEntryProps } from "@c/sections/home/LogEntry";
import ProjectCard from "@c/sections/projects/ProjectCard";
import RepoPanel from "@c/ui/RepoPanel";
import NavBar from "@c/ui/NavBar";
import LinkButton from "@c/ui/LinkButton";
import BookIcon from "@c/icons/BooksIcon";
import CommitIcon from "@c/icons/CommitIcon";
import DocsIcon from "@c/icons/DocsIcon";

import { projects } from "@/config/projects";

export const metadata: Metadata = {
  title: "Oliver Norrie | Computer Science Student at Edinburgh",

  description:
    "Explore Oliver Norrie's software projects, technical experience, and interests in Computer Science. Studying at the University of Edinburgh, with projects spanning web development, Python, and self-hosted infrastructure.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Oliver Norrie | Computer Science Student at Edinburgh",
    description:
      "Software projects, technical experience, and Computer Science interests from Oliver Norrie, a student at the University of Edinburgh.",
    url: "/",
  },
};

const featuredProjects = projects.filter((project) => project.featured);

// Newest first
const log: LogEntryProps[] = [
  {
    date: "2026-04",
    kind: "award",
    title: "VEX Robotics V5: programming award at UK Nationals",
    details: [
      "Our team won the programming award at the UK National finals.",
      "That qualified us for the world championship in the USA later that year.",
    ],
  },
  {
    date: "2025-11",
    kind: "work",
    title: "Placement week with LUMC IT Infrastructure, Leiden",
    details: [
      "Shadowed several teams, including DevOps, to see the day to day computing behind one of the biggest hospitals in the Netherlands.",
      "Got a much better picture of how infrastructure changes when it has to handle huge amounts of data.",
      "Learned about their project migrating the hospital's infrastructure to a modern data warehouse.",
    ],
  },
  {
    date: "2024-09",
    kind: "work",
    title: "Audio & visual lead, UoE satellite instrument project",
    details: [
      "Part time, Sep 2024 to Nov 2025.",
      "Made graphics that explain complex instrument data to investors and scientific audiences.",
      "Took output from the team's end to end instrument model and turned it into metrics people could follow.",
      "Some of that work went into funding proposals to the European Space Agency.",
    ],
  },
  {
    date: "2024-02",
    kind: "award",
    title: "STEM Racing: 2nd at UK National finals + Best Display",
    details: [
      "I was head of branding for the team.",
      "Our display won awards at both the regional and national competitions.",
    ],
  },
];

const logYears = [...new Set(log.map((entry) => entry.date.slice(0, 4)))];

const commit = process.env.BUILD_COMMIT;
const buildDate = process.env.BUILD_DATE;

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded-md bg-white/10 px-1.5 py-0.5 font-mono text-[0.9em] text-text-primary">
      {children}
    </code>
  );
}

export default function LandingPage() {
  return (
    <PortfolioLayout
      profile={<ProfileCard />}
      navigation={
        <NavBar
          type="top"
          items={[
            { label: "about", targetId: "about" },
            { label: "projects", href: "/projects" },
            { label: "log", targetId: "log" },
          ]}
        />
      }
    >
      <RepoPanel id="about" icon={DocsIcon} title="README.md">
        <div className="fade-up max-w-3xl leading-relaxed text-text-secondary">
          <h3 className="border-b border-white/10 pb-3 text-3xl font-bold text-text-primary">
            Hi, I&apos;m Oliver
          </h3>

          <p className="mt-4">
            I&apos;m a Computer Science student at the University of Edinburgh,
            working towards a career as a software developer.
          </p>

          <h4 className="mt-8 border-b border-white/10 pb-2 text-xl font-semibold text-text-primary">
            What I&apos;m into
          </h4>
          <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-primary">
            <li>
              <strong className="text-text-primary">Cyber security</strong>: how
              systems break, and how to build them so they don&apos;t.
            </li>
            <li>
              <strong className="text-text-primary">
                Quantitative finance
              </strong>
              : problems where the code has to be right and the numbers have to
              hold up.
            </li>
            <li>
              <strong className="text-text-primary">Self-hosting</strong>: this
              site runs in Docker on my <Code>homelab</Code>, behind a
              Cloudflare tunnel.
            </li>
          </ul>

          <h4 className="mt-8 border-b border-white/10 pb-2 text-xl font-semibold text-text-primary">
            Away from the keyboard
          </h4>
          <p className="mt-4">
            I&apos;ve competed nationally and internationally in VEX Robotics
            and STEM Racing, and I design and 3D-print things, including the
            case my server lives in.
          </p>
        </div>
      </RepoPanel>

      <RepoPanel
        id="projects"
        icon={BookIcon}
        title="Pinned"
        action={
          <LinkButton href="/projects" className="h-8 px-4 py-0 text-sm">
            View all
          </LinkButton>
        }
      >
        <div className="grid gap-4 xl:grid-cols-2">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </RepoPanel>

      <RepoPanel
        id="log"
        icon={CommitIcon}
        title="Log"
        action={
          <span className="font-mono text-xs text-text-secondary">
            {log.length} entries
          </span>
        }
      >
        {logYears.map((year) => (
          <div key={year} className="pb-6 last:pb-0">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-text-secondary">
              <CommitIcon aria-hidden="true" className="h-4 w-4" />
              {year}
            </h3>

            {/* The vertical line joining the entries, like a commit graph */}
            <ol className="mt-3 ml-2 space-y-3 border-l border-white/15 pl-5">
              {log
                .filter((entry) => entry.date.startsWith(year))
                .map((entry) => (
                  <LogEntry key={entry.title} {...entry} />
                ))}
            </ol>
          </div>
        ))}
      </RepoPanel>

      <footer className="flex flex-wrap justify-between gap-2 px-2 font-mono text-xs text-text-secondary">
        <a
          href={`https://github.com/GrayHound85/personal-site/commit/${commit}`}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-text-primary"
        >
          build {commit} · {buildDate}
        </a>
        <Link
          href="/login"
          className="transition-colors hover:text-text-primary"
        >
          admin
        </Link>
      </footer>
    </PortfolioLayout>
  );
}
