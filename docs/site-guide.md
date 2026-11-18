# Site guide

Notes for myself on updating the public side of the site. All of it is plain
data in a couple of files, no database involved.

| I want to...                           | Edit                                               |
| -------------------------------------- | -------------------------------------------------- |
| Add a log entry (award, work, etc.)    | `src/app/page.tsx` → `log` array                   |
| Add a project                          | `src/config/projects.ts` + a new page folder       |
| Pin / unpin a project on the home page | `featured` in `src/config/projects.ts`             |
| Change the README panel text           | `src/app/page.tsx` → `README.md` panel             |
| Change sidebar (photo, links, email)   | `src/components/sections/porfolio/ProfileCard.tsx` |

Before committing: `npm run lint` and `npm run build`.

---

## Log entries

The log is the `log` array near the top of `src/app/page.tsx`.

```ts
{
  date: "2026-06",        // "YYYY-MM"
  kind: "award",          // "award" or "work"
  title: "Short, commit-message style title",
  details: [
    "Each string is one line in the expanded view.",
    "Keep them short, they reveal one after another.",
  ],
},
```

- **Keep the array newest first.** It isn't sorted automatically. The year
  groups (2026, 2025, ...) come from the dates in the order they appear.
- `date` is only used for the year heading and the "Apr 2026" label, so pick the
  start month for things that span a while and put the full range in `details`
  (see the satellite project entry).
- `title` is also the React key, so two entries can't share the exact same title.
- The "4 entries" count in the panel header updates by itself.

### Adding a new kind (e.g. `"hackathon"`)

1. Add it to the `kind` union in `LogEntryProps`
   (`src/components/sections/home/LogEntry.tsx`).
2. Add a badge style for it in `kindStyles` in the same file. TypeScript will
   complain until you do.

---

## Projects

Every project lives in one list: `src/config/projects.ts`. The order in that
list is the order everywhere (home page and `/projects`).

From that list, automatically:

- the row on `/projects`
- the pinned card on the home page (if `featured: true`)
- the sitemap entry (`src/app/sitemap.ts` reads the list)
- the `home / projects / <slug>` nav bar and the tags on the project page
- the page's `<title>` and meta description

`/projects/*` is already public in `ACCESS_RULES`, so nothing to do there.

## Building a project page, step by step

### Step 1: plan what goes where

Each piece of information should appear **once**. Before writing, decide
which slot each thing belongs in:

| Slot                 | Put here                                                              | Don't put here                       |
| -------------------- | --------------------------------------------------------------------- | ------------------------------------ |
| `summary` (config)   | One sentence: what it is. Shows on cards + search results             | The tech stack (that's the tags)     |
| `tags` (config)      | The stack: languages, frameworks, tools (`Next.js`, `Docker`)         | Categories like "Web", sentences     |
| `headline` (header)  | A plain description of the project, a few words longer than the title | Marketing lines                      |
| `intro` (header)     | 1–2 sentences: what you built and why it exists                       | Specs, stack, plans                  |
| `status` (header)    | A few words on where it's at: "Live, hosting this site"               | Plans (that's the direction section) |
| First section        | What you actually built, specs and details live here only             |                                      |
| Architecture section | How it works / fits together                                          | Specs already given above            |
| Skills section       | What _you_ learnt, not a re-description of the tech                   |                                      |
| Direction section    | Plans. This is the only place future work is described                | Disclaimers repeated elsewhere       |

The four sections above are what the existing pages use. They're a default,
not a rule: a small project can just be one or two sections.

### Step 2: add the config entry

In `src/config/projects.ts`:

```ts
{
  slug: "port-scanner",   // folder name + URL: /projects/port-scanner
  title: "Port Scanner",  // used in the page title
  summary: "A multithreaded TCP port scanner I wrote to learn how network reconnaissance works.",
  tags: ["Python", "Sockets"],
  year: 2026,
  featured: true,         // pin it on the home page
},
```

New tag? Give it a dot colour in `tagColours` at the top of
`src/components/sections/projects/ProjectTags.tsx`, otherwise it gets the
primary colour.

### Step 3: add images

Put them in `public/projects/`, named `<slug>_<what>.png`
(e.g. `port-scanner_output.png`). Note each image's real width and height
(`file public/projects/<name>` prints them), you'll pass those in step 4.

### Step 4: create the page

Create `src/app/projects/<slug>/page.tsx`. The folder name **must match the
slug**: `getProject("<slug>")` throws if it isn't in the config, so a typo
fails the build. The other direction isn't checked: a config entry with no
page folder is a 404 link.

The building blocks are all in `src/components/sections/projects/`:

| Component        | What it is                                                                                     |
| ---------------- | ---------------------------------------------------------------------------------------------- |
| `ProjectHeader`  | The card at the top: label pill, status, headline, intro, tags, GitHub button                  |
| `ProjectSection` | One `<id>.md` panel with a heading. Plain `<p>` / `<strong>` / `<a>` inside are styled for you |
| `ProjectDetails` | Two column "term / description" rows, good for specs                                           |
| `ProjectList`    | Bullet list where each item starts with a bold label                                           |
| `ProjectImage`   | Image with a title strip and caption. Leave out `src` for a placeholder box                    |

`ProjectPageLayout` (`src/components/layout/`) is just the shell: background,
the `home / projects / <slug>` nav bar, the header on top and the "On this page"
nav beside the sections.

Copy this and fill it in (the two existing pages are fuller examples):

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

// One entry per <ProjectSection>, the ids must match
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
        <p>Just write paragraphs, they're styled already.</p>

        <ProjectDetails
          items={[{ term: "Scanning", description: "What it does..." }]}
        />

        <ProjectImage
          title="Scanner output"
          description="Caption under the image."
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
        <p>A short lead-in.</p>

        <ProjectList
          items={[{ label: "Networking", text: "raw sockets and..." }]}
        />
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

Options worth knowing:

- `ProjectHeader`: leave out `github` for no button, and pass
  `label="University project"` etc. to change the pill (defaults to
  "Personal project"). Leave out `status` to hide
  it.
- `ProjectSection`: `label` is the small text on the right of its strip,
  hidden on mobile.
- For anything one-off, plain JSX inside a `ProjectSection` is fine, the
  components are only for the patterns that repeat.

### Step 5: check it

1. `npm run dev` and open `/projects/<slug>`. Click each "On this page" link
   to check the ids match.
2. Read it top to bottom once looking for anything said twice (step 1's
   table). Specs and plans are the usual repeat offenders.
3. Check it shows on `/projects`, and on the home page if `featured`.
4. `npm run lint` and `npm run build`.

## Pinning

- `featured: true` → shows in the Pinned panel on the home page.
- Order on the home page = order in the config list, so move an entry up to
  pin it first.
- The grid is 2 columns on wide screens, so an even number of pinned projects
  looks tidiest (2 or 4).
- Unpinned projects are still on `/projects` and in the sitemap.

---

## README panel

The README panel text is written straight into `src/app/page.tsx` (the
`RepoPanel` with `title="README.md"`). Use the small `Code` component in that
file for inline code-styled words, like `<Code>homelab</Code>`.

Heading levels: the sidebar name is the page's `h1` and panel titles are `h2`,
so inside the README use `h3` for the main heading and `h4` for subheadings.

---

## Animations

- **Decrypt reveal**: `src/components/ui/ScrambleText.tsx`. Only use it on
  monospace text (`font-mono`), with proportional fonts the random characters
  are different widths and the line jitters. Speed is `REVEAL_SPEED` in
  `LogEntry.tsx` (milliseconds per character, lower is faster).
- **Fade / slide in** classes are in `src/app/globals.css`:
  - `fade-up`: plays once on load (README panel).
  - `reveal-on-scroll`: slides in as it scrolls into view (log entries). Pure
    CSS, so Firefox currently just shows things without animating.
  - All of them switch off when the visitor has reduced motion turned on.

---

## Build stamp in the footer

The `build abc1234 · date` line comes from `next.config.ts`, which sets
`BUILD_COMMIT` and `BUILD_DATE` at build time. In CI the commit is passed into
the Docker build as `GIT_COMMIT` (see `.github/workflows/production.yml` and the
`ARG GIT_COMMIT` in the `Dockerfile`), because `.git` isn't copied into the
image. Locally it falls back to `git rev-parse`. It links to that commit on
GitHub, so it only works once the commit has been pushed.
