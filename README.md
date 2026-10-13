# Personal Site

A personal portfolio and self-hosted web platform for showcasing
projects, documenting technical work, and building private tools for
learning and personal project management.

The application combines a public-facing portfolio with a
password-protected workspace. It is an active, evolving project: the
portfolio and core application foundations are in place, and the
resource library is the clearest example of a complete data-backed
workflow. Other workspace areas are being developed incrementally.

**Repository:**
[GrayHound85/personal-site](https://github.com/GrayHound85/personal-site)\
**Live site:** [olivernorrie.com](https://olivernorrie.com)

------------------------------------------------------------------------

## Contents

-   [Project goals](#project-goals)
-   [Current status](#current-status)
-   [Technology stack](#technology-stack)
-   [Architecture](#architecture)
-   [Application structure](#application-structure)
-   [Key application flows](#key-application-flows)
-   [Getting started](#getting-started)
-   [Environment variables](#environment-variables)
-   [Database and migrations](#database-and-migrations)
-   [Docker and deployment](#docker-and-deployment)
-   [Security notes](#security-notes)
-   [Learning objectives](#learning-objectives)
-   [Roadmap](#roadmap)

------------------------------------------------------------------------

## Project goals

This project is intended to grow into a practical home for my work and
learning. It has two main boundaries:

-   **Public portfolio:** presents my profile, experience, achievements,
    projects, and project write-ups.
-   **Private workspace:** provides a foundation for personal tools and
    data that should not be publicly accessible.

The longer-term goal is to keep these experiences within one application
while keeping private features and operations protected.

## Current status

  Area                                           Status
  ---------------------------------------------- ---------------------------------------
  Public portfolio and profile                   Implemented
  Public project listing and project write-ups   Implemented
  Password-protected administrator access        Implemented
  PostgreSQL integration with Drizzle ORM        Implemented
  Data-backed resource library                   Core workflow implemented
  Dashboard and workspace navigation             Foundation in place
  Career and study tools                         In progress; some pages are scaffolds
  Media workspace                                Entry page / early foundation
  Finance workspace                              Entry page / early foundation
  Additional interactive projects                Planned

The application should be treated as a work in progress. A route or
navigation item does not necessarily mean that the complete feature
behind it has been built.

## Technology stack

  -----------------------------------------------------------------------------------
  Technology                                      Purpose
  ----------------------------------------------- -----------------------------------
  [Next.js](https://nextjs.org/) App Router       Application framework, routing,
                                                  server rendering, and server-side
                                                  operations

  [React](https://react.dev/)                     Component-based user interface

  [TypeScript](https://www.typescriptlang.org/)   Static typing for application code

  [Tailwind CSS 4](https://tailwindcss.com/)      Responsive styling and design
                                                  system

  [PostgreSQL](https://www.postgresql.org/)       Persistent relational data

  [Drizzle ORM](https://orm.drizzle.team/)        Typed database access and schema
                                                  management

  [NextAuth.js](https://authjs.dev/)              Credentials-based authentication
                                                  and session handling

  [Docker](https://www.docker.com/)               Containerised application
                                                  deployment

  Docker Compose                                  Local and server-side service
                                                  configuration

  Cloudflare Tunnel                               Remote access to the self-hosted
                                                  environment
  -----------------------------------------------------------------------------------

------------------------------------------------------------------------

## Architecture

The application is organised around the Next.js App Router. Pages and
React components provide the interface, server-side actions handle
validated changes, and data access is separated into service and
repository layers.

### 1. System architecture

``` mermaid
flowchart TB
    Visitor["Visitor / Administrator"]

    subgraph Access["Access and delivery"]
        Browser["Web browser"]
        CF["Cloudflare / Tunnel"]
    end

    subgraph App["Next.js application"]
        Routes["App Router<br/>Public and private routes"]
        UI["Layouts and React components<br/>Tailwind CSS"]
        Auth["NextAuth.js<br/>Credentials and JWT session"]
        Actions["Server actions / server-side operations"]
        Services["Service layer<br/>Validation and application logic"]
        Repositories["Repository layer<br/>Database queries"]
        Config["Configuration<br/>Projects and application settings"]
    end

    subgraph Persistence["Persistence"]
        DB[("PostgreSQL")]
        Schema["Drizzle schema"]
        Migrations["Drizzle migrations"]
    end

    Visitor --> Browser
    Browser --> CF
    CF --> Routes
    Routes --> UI
    Routes -. "Protected routes" .-> Auth
    UI --> Actions
    Actions --> Services
    Services --> Repositories
    Repositories --> DB
    Schema --> Repositories
    Migrations -. "Apply schema changes" .-> DB
    Config --> UI
```

**How to read the diagram**

1.  A visitor accesses the site through a browser. Cloudflare provides
    the configured route to the self-hosted application.
2.  The App Router selects the appropriate page or API route.
3.  React components render the interface. Server components can
    retrieve data on the server, while server-side operations handle
    changes.
4.  Authentication and route-level authorization protect private areas.
5.  Application logic is separated from database queries through service
    and repository modules.
6.  PostgreSQL stores persistent data, with Drizzle providing typed
    access and migrations tracking database changes.

The diagram describes the intended architectural boundaries; not every
page necessarily uses every layer.

### 2. Authentication and authorization

``` mermaid
flowchart TD
    Start["Request a page or submit login form"]
    Public{"Public route?"}
    PublicPage["Render public page"]
    Session["Check authentication session"]
    Credentials["Validate submitted credentials"]
    AuthResult{"Credentials valid?"}
    JWT["Create / update JWT-based session"]
    Role{"Role permits access?"}
    Private["Render protected page"]
    Denied["Reject access or redirect to login"]

    Start --> Public
    Public -->|Yes| PublicPage
    Public -->|No| Session
    Session -->|No valid session| Credentials
    Session -->|Valid session| Role
    Credentials --> AuthResult
    AuthResult -->|Yes| JWT
    AuthResult -->|No| Denied
    JWT --> Role
    Role -->|Yes| Private
    Role -->|No| Denied
```

The current authentication setup uses NextAuth.js with a credentials
provider, JWT-based sessions, and an administrator role. Public
portfolio and project pages are intended to remain public; private
workspace routes require appropriate access.

### 3. Data-backed resource library

``` mermaid
flowchart TD
    User["Administrator"]
    Page["Resource library UI"]
    Operation["Server action / server-side operation"]
    Service["Resource service<br/>s-resources.ts"]
    Repository["Resource repository<br/>r-resources.ts"]
    ORM["Drizzle ORM"]
    DB[("PostgreSQL")]

    User --> Page
    Page --> Operation
    Operation --> Service
    Service --> Repository
    Repository --> ORM
    ORM --> DB
    DB --> ORM
    ORM --> Repository
    Repository --> Service
    Service --> Page
```

The resource library organises learning material around categories,
subcategories, topics, and associated resources or links. The service
layer represents application-level operations; the repository layer
contains the data-access logic. Resource changes are restricted to an
authenticated administrator.

### 4. Deployment architecture

``` mermaid
flowchart TB
    Developer["Developer"]
    GitHub["GitHub repository"]
    Actions["GitHub Actions<br/>Build container image"]
    Registry["GitHub Container Registry"]
    Server["Ubuntu homelab server"]
    Compose["Docker Compose"]
    App["Next.js application container"]
    Postgres[("PostgreSQL container")]
    Tunnel["Cloudflare Tunnel"]
    Users["Remote browser"]

    Developer --> GitHub
    GitHub --> Actions
    Actions --> Registry
    Registry -->|"Pull published image"| Server
    Server --> Compose
    Compose --> App
    Compose --> Postgres
    App --> Postgres
    Users --> Tunnel
    Tunnel --> App
```

The deployment workflow builds a container image in GitHub Actions and
publishes it to GitHub Container Registry. The homelab server pulls the
image and runs the application alongside PostgreSQL through Docker
Compose. Cloudflare Tunnel provides configured remote access without
requiring the application to be exposed directly through a public
inbound port.

------------------------------------------------------------------------

## Application structure

The following is a guide to the main directories. Some route and feature
directories are still being developed.

``` text
.
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root application layout
│   │   ├── page.tsx                # Public landing page
│   │   ├── api/
│   │   │   └── auth/
│   │   │       └── [...nextauth]/  # NextAuth route handler
│   │   ├── login/                  # Login page and form
│   │   ├── projects/               # Public projects and write-ups
│   │   ├── career/                 # Career and learning workspace
│   │   ├── dashboard/              # Private workspace dashboard
│   │   ├── media/                  # Media area foundation
│   │   └── finance/                # Finance area foundation
│   ├── components/
│   │   ├── layout/                 # Shared page layouts
│   │   ├── sections/               # Page-specific sections
│   │   ├── ui/                     # Reusable interface components
│   │   └── icons/                  # Icon components
│   ├── config/
│   │   └── projects.ts             # Project presentation/configuration
│   ├── db/
│   │   ├── db.ts                   # Database connection/access
│   │   └── schema.ts               # Drizzle schema definitions
│   ├── lib/
│   │   ├── repo/                   # Data-access repositories
│   │   └── service/                # Application/service logic
│   └── auth.ts                     # Authentication configuration
├── drizzle/
│   ├── migrations/                 # Versioned database migrations
│   └── seed.ts                     # Database seed data
├── scripts/
│   └── migrate.mjs                 # Migration runner
├── auth.config.ts                  # Shared auth configuration
├── drizzle.config.ts               # Drizzle configuration
├── Dockerfile                      # Container image build
├── compose.yaml                    # Compose service definitions
└── package.json                    # Dependencies and npm scripts
```

> This tree highlights the key architectural areas rather than every
> file. Check the repository for the exact current file names and
> available npm scripts.

### Important architectural areas

-   **`src/app/` --- Routing:** file-system routes, layouts, pages, and
    API handlers.
-   **`src/components/` --- Presentation:** reusable layouts, UI
    primitives, icons, and page sections.
-   **`src/lib/service/` --- Application logic:** coordinates operations
    and applies application-level rules.
-   **`src/lib/repo/` --- Data access:** encapsulates database queries.
-   **`src/db/` and `drizzle/` --- Persistence:** database connection,
    schema, migrations, and seed data.
-   **`src/auth.ts` and `auth.config.ts` --- Authentication:**
    credentials provider, sessions, and access configuration.
-   **`src/config/` --- Static configuration:** project metadata and
    presentation configuration.
-   **`scripts/` --- Operational tasks:** utilities such as applying
    migrations.

------------------------------------------------------------------------

## Key application flows

### Public portfolio request

1.  A visitor opens the home page or a public project page.
2.  Next.js matches the URL to a route in `src/app/`.
3.  The relevant layout and components render the page.
4.  The visitor can browse portfolio information and project write-ups
    without signing in.

### Private workspace request

1.  The user opens a protected workspace route.
2.  The application checks the current authentication session and
    authorization rules.
3.  If necessary, the user is directed to `/login`.
4.  After valid credentials are accepted, NextAuth.js manages the
    session.
5.  Access is granted only when the user's role and route rules permit
    it.

### Resource data request

1.  A resource page requests data or submits an operation.
2.  The service layer coordinates the application logic.
3.  The repository layer executes the relevant database query through
    Drizzle.
4.  PostgreSQL returns or persists the data.
5.  The result is returned to the server-rendered page or calling
    operation.

------------------------------------------------------------------------

## Getting started

### Prerequisites

Install the following before developing locally:

-   Node.js version compatible with the project's Next.js version.
-   npm.
-   Docker and Docker Compose, if using the containerised PostgreSQL
    service.
-   Access to a PostgreSQL database.

### 1. Clone the repository

``` bash
git clone https://github.com/GrayHound85/personal-site.git
cd personal-site
```

### 2. Install dependencies

``` bash
npm install
```

### 3. Configure environment variables

Create a local `.env` file in the project root. See [Environment
variables](#environment-variables) below.

Do not commit `.env` or real credentials to Git.

### 4. Start PostgreSQL

If the repository's Compose configuration defines the PostgreSQL
service, start it with:

``` bash
docker compose up -d
```

Review `compose.yaml` first to understand which services and ports it
defines. If you already run the application through Compose, avoid
starting a second conflicting copy.

### 5. Apply database migrations

The repository includes Drizzle migrations and a migration runner at
`scripts/migrate.mjs`. Once `DATABASE_URL` points to a reachable
database, apply migrations using the repository's documented migration
command or the appropriate package script.

To see available scripts:

``` bash
npm run
```

Use the migration command configured by the project rather than manually
editing the database schema.

### 6. Start the development server

``` bash
npm run dev
```

Open <http://localhost:3000>.

For a production build, the project uses:

``` bash
npm run build
```

The exact available commands are defined in `package.json`.

------------------------------------------------------------------------

## Environment variables

The application and its database service require configuration through
environment variables. The exact values depend on the environment.

  -----------------------------------------------------------------------
  Variable                            Purpose
  ----------------------------------- -----------------------------------
  `DATABASE_URL`                      PostgreSQL connection string used
                                      by the application

  `AUTH_PASSWORD`                     Password used by the
                                      credentials-based administrator
                                      login

  `AUTH_SECRET`                       Secret used by the
                                      authentication/session
                                      configuration

  `POSTGRES_USER`                     PostgreSQL user configured for the
                                      database container

  `POSTGRES_PASSWORD`                 Password for the PostgreSQL user

  `POSTGRES_DB`                       Database name created by the
                                      PostgreSQL container
  -----------------------------------------------------------------------

A local `.env` file will generally contain values for the database
connection and authentication configuration. `compose.yaml` may also use
the `POSTGRES_*` variables to initialise the database container.

**Important:** `DATABASE_URL` must use a hostname and port reachable
from the process that consumes it. When the application runs inside
Docker Compose, that commonly means using the database service name
rather than `localhost`. When running Next.js directly on the host, the
connection details may be different.

Never use placeholder examples as production credentials. Use strong,
unique secrets and keep them out of source control.

------------------------------------------------------------------------

## Database and migrations

The application uses PostgreSQL for persistent relational data and
Drizzle ORM for typed queries and schema definitions.

Relevant files:

-   `src/db/db.ts` --- database connection and access.
-   `src/db/schema.ts` --- schema definitions.
-   `drizzle.config.ts` --- Drizzle configuration.
-   `drizzle/migrations/` --- versioned schema migrations.
-   `drizzle/seed.ts` --- seed data.
-   `scripts/migrate.mjs` --- migration runner.

### Development guidance

-   Make schema changes through the project's Drizzle workflow.
-   Commit generated migration files alongside the corresponding code
    changes.
-   Apply migrations to the target database before deploying code that
    depends on the new schema.
-   Keep seed data separate from production data.
-   Back up persistent data before destructive schema changes.

The database connection is designed to be initialised lazily where
needed, which helps avoid requiring a live database connection during
build steps that only need to compile the application.

------------------------------------------------------------------------

## Docker and deployment

The application is designed to run in a container on a self-hosted
Ubuntu server.

### Main deployment pieces

-   **`Dockerfile`:** builds the Next.js application image using a
    multi-stage build.
-   **`compose.yaml`:** defines the container services, including
    PostgreSQL.
-   **GitHub Actions:** builds and publishes the application image when
    the configured workflow is triggered.
-   **GitHub Container Registry (GHCR):** stores the published image.
-   **Cloudflare Tunnel:** provides the configured remote access path to
    the homelab.

### Typical image update sequence

After the relevant GitHub Actions workflow has successfully published a
new image, connect to the server and run the pull/recreate sequence from
the directory containing the deployment `compose.yaml`:

``` bash
docker compose pull
docker compose up -d
```

Compose will pull the configured image and recreate containers when
their image or configuration has changed. Check the actual service and
image names in the deployment Compose file before running these
commands.

Useful checks:

``` bash
docker compose ps
docker compose logs -f app
```

Replace `app` with the actual Compose service name if it differs.
Database persistence depends on the volume configuration in
`compose.yaml`; do not remove volumes as part of a routine application
update.

------------------------------------------------------------------------

## Security notes

This application combines public pages with private personal tools. Keep
that boundary explicit.

-   Keep `.env` files, passwords, database credentials, and
    authentication secrets out of Git.
-   Use strong credentials for administrator access.
-   Enforce authorization on the server for private pages and sensitive
    operations; hiding a link in the interface is not access control.
-   Validate data submitted to server actions before changing persistent
    state.
-   Avoid exposing database credentials or private data to client-side
    components.
-   Restrict database access to the application and trusted
    administrative processes.
-   Keep production secrets configured on the server or in the
    deployment environment.
-   Back up important database data before migrations or maintenance.

The authentication flow described here reflects the project's current
credentials-based administrator model; it should not be interpreted as a
claim that every planned workspace feature is complete.

------------------------------------------------------------------------

## Learning objectives

This project is also a hands-on way to develop full-stack engineering
skills:

-   **Full-stack feature development:** connecting pages, validation,
    server-side operations, and persistent data.
-   **Data modelling:** representing learning resources and their
    relationships in a relational schema.
-   **Separation of concerns:** keeping presentation, service logic,
    repository queries, and database definitions distinct.
-   **Authentication and authorization:** protecting private routes and
    administrative operations.
-   **Deployment:** building container images and running an application
    on self-managed infrastructure.
-   **Product judgement:** delivering features incrementally and
    communicating clearly about what is implemented versus planned.

## Roadmap

The longer-term direction includes:

-   Expanding the career and study workspace with useful learning and
    professional-development tools.
-   Developing the media area for managing a personal media library.
-   Building finance tools for personal tracking and future market
    analysis.
-   Hosting more interactive projects within the public site.
-   Improving the private dashboard as more complete workflows become
    available.

These are intended directions, not claims that the features are already
implemented.

------------------------------------------------------------------------

## Project links

-   **Source code:** [GitHub
    repository](https://github.com/GrayHound85/personal-site)
-   **Portfolio:** [olivernorrie.com](https://olivernorrie.com)
