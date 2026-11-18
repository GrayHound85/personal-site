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

- the card on `/projects`
- the pinned card on the home page (if `featured: true`)
- the sitemap entry (`src/app/sitemap.ts` reads the list)
- the page's `<title>` and meta description

`/projects/*` is already public in `ACCESS_RULES`, so nothing to do there.

### 1. Add the entry

```ts
{
  slug: "port-scanner",            // folder name + URL: /projects/port-scanner
  title: "Port Scanner",           // used in the page title
  summary: "One sentence. Shown on the pinned card and as the meta description.",
  tags: ["Security", "Python"],
  year: 2026,
  featured: true,                  // pin it on the home page
  image: "/projects/port-scanner_cover.png",   // optional
  icon: {                                      // optional
    name: "ServerIcon",
    foregroundColor: "#85afd8",
    backgroundColor: "",
    invert: false,
  },
},
```

- **Images** go in `public/projects/`, referenced as `/projects/<file>`.
- The `/projects` card shows the **icon if there is one, otherwise the image**.
  Icon names are listed in `ProjectIconName` (`src/types/projects.ts`). A new
  icon needs adding there and to the `projectIcons` map in
  `src/components/sections/porfolio/ProjectCard.tsx`.
- **Tag dot colours** on the pinned cards are in `tagColours` at the top of
  `src/components/sections/home/PinnedProject.tsx`. Unknown tags get the primary
  colour, so add one there when using a new tag.

### 2. Create the page

Make `src/app/projects/<slug>/page.tsx`. The folder name **must match the
slug**: `getProject("<slug>")` throws if it isn't in the config, so a typo
fails the build rather than shipping a broken page. The other direction isn't
checked: a config entry with no page folder is a 404 link.

Starting point (copy one of the existing pages for a fuller example):

```tsx
import type { Metadata } from "next";

import ProjectPageLayout from "@c/layout/ProjectPageLayout";
import type { ProjectSectionLink } from "@c/sections/projects/ProjectContentsNav";
import ProjectImagePlaceholder from "@c/sections/projects/ProjectImagePlaceholder";
import Card from "@/components/ui/Card";
import { getProject } from "@/config/projects";

const project = getProject("port-scanner");

export const metadata: Metadata = {
  title: project.title,
  description: project.summary,
};

// One entry per <section> below, the id must match the section's id
const sections: ProjectSectionLink[] = [
  { id: "overview", title: "Overview" },
  { id: "how-it-works", title: "How it works" },
];

const overviewFacts = [
  { label: "Current focus", value: "..." },
  { label: "Core stack", value: "..." },
  { label: "Status", value: "..." },
];

export default function PortScannerProjectPage() {
  return (
    <ProjectPageLayout
      headline="The big heading at the top of the page"
      intro={<>A paragraph under the headline.</>}
      facts={overviewFacts}
      github={{
        href: "https://github.com/GrayHound85/<repo>",
        label: "View source on GitHub",
      }}
      sections={sections}
    >
      <section id="overview" className="scroll-mt-20 lg:scroll-mt-8">
        <p className="text-sm font-semibold uppercase text-primary">
          Small label
        </p>
        <h2 className="mt-2 text-2xl font-bold text-text-primary">
          Section title
        </h2>
        <Card className="mt-5 border-none bg-panel/50 p-4 sm:p-6">
          <p className="leading-7 text-text-secondary">...</p>
        </Card>
        <div className="mt-6">
          <ProjectImagePlaceholder
            title="Caption title"
            description="Caption text under the image."
            image="/projects/port-scanner_diagram.png"
          />
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-20 lg:scroll-mt-8">
        ...
      </section>
    </ProjectPageLayout>
  );
}
```

- `ProjectPageLayout` gives the back link, the header card (label, GitHub
  button, headline, intro, facts) and the "On this page" nav. Pass
  `label="University project"` etc. to change the small label, it defaults to
  "Personal project".
- Leave out `image` on `ProjectImagePlaceholder` and it renders a dashed
  placeholder box, useful while writing.

### Pinning

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
