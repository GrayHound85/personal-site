# Site guide

> Quick-reference version: the GitHub wiki, generated from `docs/wiki/`.
> Keep the two in sync: when you change something here, change the matching
> wiki page in the same commit.

Notes for myself on updating the public side of the site. All of it is plain
data in a couple of files, no database involved.

| I want to...                                       | Edit                                                                  |
| -------------------------------------------------- | --------------------------------------------------------------------- |
| Add a log entry (award, work, etc.)                | `apps/personal-site/src/app/page.tsx` → `log` array                   |
| Add a project                                      | `apps/personal-site/src/config/projects.ts` + a new page folder       |
| Pin / unpin a project on the home page             | `featured` in `apps/personal-site/src/config/projects.ts`             |
| Change the README panel text                       | `apps/personal-site/src/app/page.tsx` → `README.md` panel             |
| Change sidebar (photo, links, email)               | `apps/personal-site/src/components/sections/porfolio/ProfileCard.tsx` |
| Add / edit / delete resources, topics…             | The `+` and pencil buttons on `/career/resources`                     |
| Build a new form                                   | See [Forms](#forms)                                                   |
| Run, build, add a dependency or a shared component | See [Repo layout](#repo-layout-and-everyday-commands)                 |

Before committing, from the repo root: `pnpm lint`, `pnpm typecheck` and `pnpm build:site`.

---

## Repo layout and everyday commands

The repo is a pnpm workspace: each app lives in `apps/`, and code the apps
share lives in `packages/`.

```
apps/
  personal-site/      the Next.js site (pages, database, auth, server actions)
  monitor-site/       (later) the monitoring app
packages/
  ui/                 @repo/ui: shared components, icons, the FormState type
    src/
      theme.css       colours, fonts, animations, base page styles
      components/     panels, nav bars, buttons, tag dots, the form system
      icons/
      types/
docs/                 this guide, monorepo-migration.md, wiki/ (the GitHub wiki)
package.json          root: scripts only
pnpm-workspace.yaml
olivernorrie.code-workspace
```

**The one rule: apps can import from `packages/`, but never from each other.**
Anything two apps both need goes in a package. ESLint enforces it: each app's
`eslint.config.mjs` lists the other apps in `otherApps`, and importing one is
an error. `packages/ui` can't import from any app either.

### First-time setup

pnpm comes from corepack (part of Node), pinned to the version in the root
`package.json`. Once per machine:

```bash
corepack enable pnpm        # may need sudo, or add --install-directory ~/.local/bin
pnpm install                # from the repo root
```

### Commands (run from the repo root)

| To...                                  | Run                |
| -------------------------------------- | ------------------ |
| Run the site locally                   | `pnpm dev:site`    |
| Production build of the site           | `pnpm build:site`  |
| Run that build                         | `pnpm start:site`  |
| Lint every app and package             | `pnpm lint`        |
| Type-check every app and package       | `pnpm typecheck`   |
| Make a migration after a schema change | `pnpm db:generate` |
| Apply migrations locally               | `pnpm db:migrate`  |

When the monitoring app exists it gets its own `dev:monitor` style scripts in
the root `package.json`.

### Adding a dependency

Always add it to the app or package that uses it, not the root:

```bash
pnpm --filter personal-site add some-package       # a site dependency
pnpm --filter personal-site add -D some-dev-tool   # a dev dependency
pnpm --filter @repo/ui add some-package            # used by shared components
```

pnpm is strict: code can only import packages listed in its own
`package.json`, so a missing entry fails straight away instead of working by
accident. If a new package needs an install script (pnpm will warn that it
skipped one), add it to `onlyBuiltDependencies` in `pnpm-workspace.yaml`.

### Adding a shared component to `packages/ui`

1. Create `packages/ui/src/components/MyThing.tsx` (or move one across with
   `git mv`).
2. Inside the package, import other files **relatively**
   (`./Button`, `../types/forms`). The site's `@/` and `@c/` aliases don't
   exist there, and ESLint will flag them.
3. Keep `"use client"` at the top if it uses hooks or event handlers.
4. Use it from an app with `import MyThing from "@repo/ui/components/MyThing";`
   (icons: `@repo/ui/icons/...`, types: `@repo/ui/types/...`).
5. Tailwind classes in it just work: the site's `globals.css` has an
   `@source` line pointing at `packages/ui/src`.
6. Run `pnpm typecheck` and `pnpm lint`.

Only move things that are actually generic. Anything that uses the site's
data, database, server actions or auth stays in `apps/personal-site`.

### Env file and local database

- The site's env file is `apps/personal-site/.env.local` (Next only reads env
  files from the app's own folder).
- Local Postgres: `docker compose -f apps/personal-site/compose.yaml up -d postgres`

### Opening it in VS Code

Open `olivernorrie.code-workspace` (File → Open Workspace from File). The
sidebar shows "Personal site" and "Shared UI" as separate folders, so each
gets its own search, ESLint and TypeScript setup.

- **Monitoring**: the entry is commented out. Once `apps/monitor-site` exists,
  remove the `//` from its two lines.
- **Root files** (`docs/`, `.github/`, the root `package.json`) aren't in the
  sidebar. To see them too, add `{ "name": "Repo root", "path": "." }` to the
  `folders` list.

### Building the Docker image

The image is built from the repo root, since it needs `packages/ui` too:

```bash
docker build -f apps/personal-site/Dockerfile .
```

CI does this on every push to `main` that touches the site, the shared
packages, the lockfile or the workspace files
(`.github/workflows/personal-site.yml`), then pushes
`ghcr.io/<owner>/personal-site:latest`. On the homelab:
`docker compose pull && docker compose up -d`.

---

## Log entries

The log is the `log` array near the top of `apps/personal-site/src/app/page.tsx`.

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
   (`apps/personal-site/src/components/sections/home/LogEntry.tsx`).
2. Add a badge style for it in `kindStyles` in the same file. TypeScript will
   complain until you do.

---

## Projects

Every project lives in one list: `apps/personal-site/src/config/projects.ts`. The order in that
list is the order everywhere (home page and `/projects`).

From that list, automatically:

- the row on `/projects`
- the pinned card on the home page (if `featured: true`)
- the sitemap entry (`apps/personal-site/src/app/sitemap.ts` reads the list)
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

In `apps/personal-site/src/config/projects.ts`:

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
`packages/ui/src/components/TagDots.tsx`, otherwise it gets the
primary colour.

### Step 3: add images

Put them in `apps/personal-site/public/projects/`, named `<slug>_<what>.png`
(e.g. `port-scanner_output.png`). Note each image's real width and height
(`file apps/personal-site/public/projects/<name>` prints them), you'll pass those in step 4.

### Step 4: create the page

Create `apps/personal-site/src/app/projects/<slug>/page.tsx`. The folder name **must match the
slug**: `getProject("<slug>")` throws if it isn't in the config, so a typo
fails the build. The other direction isn't checked: a config entry with no
page folder is a 404 link.

The building blocks are all in `apps/personal-site/src/components/sections/projects/`:

| Component        | What it is                                                                                     |
| ---------------- | ---------------------------------------------------------------------------------------------- |
| `ProjectHeader`  | The card at the top: label pill, status, headline, intro, tags, GitHub button                  |
| `ProjectSection` | One `<id>.md` panel with a heading. Plain `<p>` / `<strong>` / `<a>` inside are styled for you |
| `ProjectDetails` | Two column "term / description" rows, good for specs                                           |
| `ProjectList`    | Bullet list where each item starts with a bold label                                           |
| `ProjectImage`   | Image with a title strip and caption. Leave out `src` for a placeholder box                    |

`ProjectPageLayout` (`apps/personal-site/src/components/layout/`) is just the shell: background,
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

1. `pnpm dev:site` and open `/projects/<slug>`. Click each "On this page" link
   to check the ids match.
2. Read it top to bottom once looking for anything said twice (step 1's
   table). Specs and plans are the usual repeat offenders.
3. Check it shows on `/projects`, and on the home page if `featured`.
4. `pnpm lint`, `pnpm typecheck` and `pnpm build:site`.

## Pinning

- `featured: true` → shows in the Pinned panel on the home page.
- Order on the home page = order in the config list, so move an entry up to
  pin it first.
- The grid is 2 columns on wide screens, so an even number of pinned projects
  looks tidiest (2 or 4).
- Unpinned projects are still on `/projects` and in the sitemap.

---

## README panel

The README panel text is written straight into `apps/personal-site/src/app/page.tsx` (the
`RepoPanel` with `title="README.md"`). Use the small `Code` component in that
file for inline code-styled words, like `<Code>homelab</Code>`.

Heading levels: the sidebar name is the page's `h1` and panel titles are `h2`,
so inside the README use `h3` for the main heading and `h4` for subheadings.

---

## Resource library

Everything is managed from `/career/resources` (no code changes needed).

### Adding

| To add        | Where                                                                                                     |
| ------------- | --------------------------------------------------------------------------------------------------------- |
| A category    | `+ category` under the category list                                                                      |
| A subcategory | Open the category, `+ subcategory` at the bottom of its list                                              |
| A topic       | Open the category, `+ topic`. Pick "in" to put it directly in the category or in one of its subcategories |
| A resource    | Open the topic, `+` in the resources panel                                                                |

### Editing and deleting

Every pencil button opens an edit form with a **Delete** button at the bottom
(it asks to confirm first).

| To edit       | Pencil is on…                                  | Can change                          |
| ------------- | ---------------------------------------------- | ----------------------------------- |
| A category    | The category panel header, next to `← all`     | Name                                |
| A subcategory | Its heading in the topic list                  | Name                                |
| A topic       | The summary panel header (on the topic's page) | Name, and which subcategory it's in |
| A resource    | Its row in the resources list                  | Name, URL, type                     |

- **You can only delete empty things.** A category with subcategories or
  topics, a subcategory with topics, or a topic with resources can't be
  deleted: you get a message saying what's still in it. Resources can always
  be deleted (their notes go with them).
- Deleting the page you're on takes you up a level (a topic → its category, a
  category → all categories).
- Renaming doesn't change the URL. The slug is made once, when the thing is
  created, so links and bookmarks keep working.

### Names and slugs

- URLs (slugs) are made from the name: `Next.js` → `nextjs`, `C++` → `cpp`,
  `Web Development` → `web-development`. Topic slugs are unique across every
  category, so a second "Basics" topic becomes `basics-2`.
- Names have to be unique where they live: no two categories with the same
  name, no two subcategories with the same name in one category, and no two
  topics with the same name in the same place. This also applies when renaming
  or moving.

### Resource types

The types (video, website, book, docs) live in the `ResourceType` table, and
there's no page for managing them, so add them with a command on the homelab.
`code` is what the site uses internally (lowercase, no spaces) and `name` is a
readable name. Both must be unique.

You need three names, all visible on the homelab:

- **Container**: run `docker ps` and find the Postgres one (locally it's
  `personal-site-postgres`).
- **User** and **database**: the app's `DATABASE_URL` is
  `postgres://USER:PASSWORD@HOST:5432/DATABASE`, use the `USER` and
  `DATABASE` parts (locally `postgres` and `personal_site`).

Then run (with your names swapped in):

```bash
docker exec -i personal-site-postgres psql -U postgres -d personal_site <<'SQL'
INSERT INTO "ResourceType" ("code", "name") VALUES
  ('video', 'Video'),
  ('website', 'Website'),
  ('book', 'Book'),
  ('docs', 'Documentation')
ON CONFLICT ("code") DO NOTHING;
SQL
```

It prints `INSERT 0 4` (or a smaller number if some already existed).

- `ON CONFLICT ... DO NOTHING` skips any type that already exists, so it's
  safe to run again. To add a new type later, just put its row in the list,
  e.g. `('course', 'Course')`.
- No password is needed: `docker exec` runs `psql` inside the container,
  where local connections are trusted.
- To see what's there, swap the `INSERT ... ;` for
  `SELECT "code", "name" FROM "ResourceType";`

**A new type also needs a code change** to look right: add its code to
`resourceTypeIcons` (the icon) and `resourceTypeNames` (the group heading,
e.g. "Courses") at the top of
`apps/personal-site/src/components/sections/career/resource/ResourcesList.tsx`. Without that it
still works, it just shows under its raw code with no icon.

### Where the code is

- Forms: `apps/personal-site/src/components/sections/career/resource/Create*Form.tsx` and
  `Edit*Form.tsx`
- Actions: `apps/personal-site/src/app/actions/a-resource.ts`
- Rules (duplicate names, "still has…", slugs): `apps/personal-site/src/lib/service/s-resources.ts`
- The confirm-then-delete button: `packages/ui/src/components/DeleteButton.tsx`

---

## Forms

A form is two files: a **server action** that validates and saves, and a
**form component** that lays out the fields. Everything else (pending state,
error message, submit button) is handled by `Form`.

| Piece    | File                                    | What it does                                                                            |
| -------- | --------------------------------------- | --------------------------------------------------------------------------------------- |
| `Form`   | `packages/ui/src/components/Form.tsx`   | Runs the server action, shows "Saving..." while pending, shows the error, submit button |
| `Field`  | `packages/ui/src/components/Field.tsx`  | A mono label above whatever control you put inside it                                   |
| `Input`  | `packages/ui/src/components/Input.tsx`  | Text / url / password etc. Takes any normal `<input>` props                             |
| `Select` | `packages/ui/src/components/Select.tsx` | The custom dropdown. Takes `name`, `options` and `placeholder`                          |

### Step 1: the server action

In `apps/personal-site/src/app/actions/a-<area>.ts`. It always takes `(state, formData)` and
returns a `FormState` (`packages/ui/src/types/forms.ts`):

- `{ status: "error", message: "..." }`: the message is shown above the button
- `{ status: "success" }`: runs the form's `onSuccess`
- (redirecting instead, like login does, is fine too)

```ts
"use server";

import { requirePathAccess } from "@/lib/auth/server";
import type { FormState } from "@repo/ui/types/forms";

export async function createThingAction(
  _state: FormState,
  formData: FormData,
): Promise<FormState> {
  // Always check access first: the proxy doesn't protect server actions
  await requirePathAccess("/career/things");

  const name = formData.get("name");

  if (typeof name !== "string" || name.trim().length === 0) {
    return { status: "error", message: "Enter a name." };
  }

  try {
    await createThingService(name.trim()); // service layer, see CLAUDE.md
  } catch {
    return { status: "error", message: "Could not save. Please try again." };
  }

  return { status: "success" };
}
```

Need an extra argument the user doesn't type in, like the topic id? Put it
first and `.bind` it in the form (see `createResourceAction`).

### Step 2: the form component

```tsx
"use client";

import { useRouter } from "next/navigation";

import { createThingAction } from "@/app/actions/a-thing";
import Field from "@repo/ui/components/Field";
import Form from "@repo/ui/components/Form";
import Input from "@repo/ui/components/Input";
import Select from "@repo/ui/components/Select";

export default function CreateThingForm({ onClose }: { onClose: () => void }) {
  const router = useRouter();

  return (
    <Form
      action={createThingAction}
      submitText="Add thing"
      pendingText="Adding..."
      onSuccess={() => {
        onClose(); // e.g. close the modal
        router.refresh(); // re-fetch the server data so the new thing shows
      }}
    >
      <Field label="name">
        <Input name="name" placeholder="Thing name" required />
      </Field>

      <Field label="kind">
        <Select
          name="kind"
          placeholder="Select a kind"
          required
          options={[
            { value: "a", label: "Kind A" },
            { value: "b", label: "Kind B" },
          ]}
        />
      </Field>
    </Form>
  );
}
```

- Every field's `name` is the key you read with `formData.get(...)` in the
  action.
- Use browser validation (`required`, `type="url"`, `maxLength`) for quick
  feedback, but always validate again in the action, since it can be called
  without the form.
- Labels are lowercase to match the rest of the site.
- `Form` options: `pendingText` (defaults to "Saving..."), `onSuccess`,
  `className` (e.g. `"w-full sm:w-100"` to size it inside a modal) and
  `submitClassName` (e.g. `"w-full"`).
- To show a form in a modal, see how `ResourcesList.tsx` passes
  `CreateResourceForm` to `onOpenModal`.

### Styling

Fields, the dropdown list and the error message all use the site's colours
already. The shared field look is `fieldClassName` in `Input.tsx`, so change
it there to restyle every input and dropdown at once.

---

## Animations

- **Decrypt reveal**: `apps/personal-site/src/components/ui/ScrambleText.tsx`. Only use it on
  monospace text (`font-mono`), with proportional fonts the random characters
  are different widths and the line jitters. Speed is `REVEAL_SPEED` in
  `LogEntry.tsx` (milliseconds per character, lower is faster).
- **Fade / slide in** classes are in `packages/ui/src/theme.css`:
  - `fade-up`: plays once on load (README panel).
  - `reveal-on-scroll`: slides in as it scrolls into view (log entries). Pure
    CSS, so Firefox currently just shows things without animating.
  - All of them switch off when the visitor has reduced motion turned on.

---

## Build stamp in the footer

The `build abc1234 · date` line comes from `apps/personal-site/next.config.ts`, which sets
`BUILD_COMMIT` and `BUILD_DATE` at build time. In CI the commit is passed into
the Docker build as `GIT_COMMIT` (see `.github/workflows/personal-site.yml` and the
`ARG GIT_COMMIT` in `apps/personal-site/Dockerfile`), because `.git` isn't copied into the
image. Locally it falls back to `git rev-parse`. It links to that commit on
GitHub, so it only works once the commit has been pushed.
