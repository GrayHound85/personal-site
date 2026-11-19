Quick reference for the site and homelab. Commands first, short notes after.

## I want to…

| Task                                              | Page                                                 |
| ------------------------------------------------- | ---------------------------------------------------- |
| Run / build / lint locally                        | [Commands](Commands)                                 |
| Set up a new machine                              | [Local Setup](Local-Setup)                           |
| **Update the site on the homelab (not Postgres)** | [Homelab: Update Site](Homelab-Update-Site)          |
| Run SQL, add resource types, back up the database | [Homelab: Database](Homelab-Database)                |
| Site down / roll back a bad deploy                | [Homelab: Troubleshooting](Homelab-Troubleshooting)  |
| Add an award or job to the log                    | [Add a Log Entry](Add-Log-Entry)                     |
| Add a project page                                | [Add a Project Page](Add-Project-Page)               |
| Pin or reorder projects                           | [Pin and Order Projects](Pin-And-Order-Projects)     |
| Change the README panel, photo or links           | [Edit the Home Page](Edit-Home-Page)                 |
| Add categories, topics, resources                 | [Resource Library](Resource-Library)                 |
| Add a shared component                            | [Shared UI](Shared-UI)                               |
| Build a form                                      | [Build a Form](Build-A-Form)                         |
| Change the database schema                        | [Database Changes](Database-Changes)                 |
| Make a page public                                | [Public and Private Pages](Public-And-Private-Pages) |
| How CI builds the image                           | [CI and Images](CI-And-Images)                       |

## Rules that always apply

- Apps never import from each other, only from `packages/`. → [Repo Layout](Repo-Layout)
- Never show the GitHub handle as text on the site. → [Design Rules](Design-Rules)
- Run commands from the repo root unless a page says otherwise.
