Two steps: a config entry, then a page. It then appears on `/projects`, in the
sitemap, and on the home page if pinned.

## 1. Config entry

`apps/personal-site/src/config/projects.ts`:

```ts
{
  slug: "port-scanner",   // URL and folder name
  title: "Port Scanner",
  summary: "One sentence: what it is.",   // cards + meta description
  tags: ["Python", "Sockets"],            // the tech stack
  year: 2026,
  featured: true,                         // pin on the home page
},
```

New tag → give it a colour in `tagColours` in
`packages/ui/src/components/TagDots.tsx`.

## 2. Images

`apps/personal-site/public/projects/<slug>_<what>.png`. Get the size with
`file apps/personal-site/public/projects/<name>`.

## 3. Page

`apps/personal-site/src/app/projects/<slug>/page.tsx` (folder name = slug,
or the build fails):

```tsx
import type { Metadata } from "next";

import ProjectPageLayout from "@c/layout/ProjectPageLayout";
import type { ProjectSectionLink } from "@c/sections/projects/ProjectContentsNav";
import ProjectDetails from "@c/sections/projects/ProjectDetails";
import ProjectHeader from "@c/sections/projects/ProjectHeader";
import ProjectImage from "@c/sections/projects/ProjectImage";
import ProjectList from "@c/sections/projects/ProjectList";
import ProjectSection from "@c/sections/projects/ProjectSection";
import { getProject } from "@/config/projects";

const project = getProject("port-scanner");

export const metadata: Metadata = {
  title: project.title,
  description: project.summary,
};

// One per <ProjectSection>, ids must match
const sections: ProjectSectionLink[] = [
  { id: "overview", title: "Overview" },
  { id: "how-it-works", title: "How it works" },
  { id: "skills", title: "Skills developed" },
  { id: "direction", title: "Where it is going" },
];

export default function PortScannerProjectPage() {
  return (
    <ProjectPageLayout
      project={project}
      sections={sections}
      header={
        <ProjectHeader
          project={project}
          headline="A port scanner built to understand network reconnaissance"
          intro="One or two sentences on what it is and why I built it."
          status="Working, adding features"
          github={{
            href: "https://github.com/GrayHound85/<repo>",
            label: "View source on GitHub",
          }}
        />
      }
    >
      <ProjectSection id="overview" title="What it does" label="Overview">
        <p>Plain paragraphs are styled already.</p>
        <ProjectDetails items={[{ term: "Scanning", description: "..." }]} />
        <ProjectImage
          title="Scanner output"
          description="Caption."
          src="/projects/port-scanner_output.png"
          width={1600}
          height={900}
        />
      </ProjectSection>

      <ProjectSection
        id="how-it-works"
        title="How it works"
        label="Under the hood"
      >
        <ProjectList items={[{ label: "Networking", text: "..." }]} />
      </ProjectSection>

      <ProjectSection
        id="skills"
        title="Skills developed"
        label="What I am practising"
      >
        <ProjectList items={[{ label: "Concurrency", text: "..." }]} />
      </ProjectSection>

      <ProjectSection
        id="direction"
        title="Where it is going"
        label="Next stages"
      >
        <p>Plans go here and nowhere else.</p>
      </ProjectSection>
    </ProjectPageLayout>
  );
}
```

| Block            | For                                                                |
| ---------------- | ------------------------------------------------------------------ |
| `ProjectHeader`  | Top card. `github` and `status` optional; `label` changes the pill |
| `ProjectSection` | One `<id>.md` panel                                                |
| `ProjectDetails` | Term / description rows (specs)                                    |
| `ProjectList`    | Bullets with a bold label                                          |
| `ProjectImage`   | Image + caption; no `src` = placeholder                            |

## Where things go (say each thing once)

| Put                      | In                       |
| ------------------------ | ------------------------ |
| What it is, one sentence | `summary`                |
| The stack                | `tags` (not in the text) |
| Where it's at            | `status`                 |
| Specs and details        | First section only       |
| Plans                    | Direction section only   |

## 4. Check

1. `pnpm dev:site`, open `/projects/<slug>`, click every "On this page" link.
2. It's on `/projects` (and home if `featured`).
3. `pnpm lint && pnpm typecheck && pnpm build:site`
