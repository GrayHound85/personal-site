Package `@repo/ui` in `packages/ui/src/`.

## Import

```ts
import RepoPanel from "@repo/ui/components/RepoPanel";
import CopyIcon from "@repo/ui/icons/CopyIcon";
import type { FormState } from "@repo/ui/types/forms";
```

CSS (already done in the site's `globals.css`):

```css
@import "tailwindcss";
@import "@repo/ui/theme.css";
@source "../../../../packages/ui/src";
```

## What's in it

| Component                                          | Use                                                        |
| -------------------------------------------------- | ---------------------------------------------------------- |
| `RepoPanel`                                        | Panel with a mono header strip (`title`, `icon`, `action`) |
| `Card`, `LinkCard`                                 | Plain / linked card                                        |
| `PathNav`                                          | `home / projects / x` nav bar, optional right slot         |
| `NavBar`                                           | Home page nav (a `PathNav` with section links)             |
| `Modal`                                            | Overlay with close button and Escape                       |
| `Button`, `LinkButton`, `CopyButton`               | Buttons                                                    |
| `TagDots`                                          | Tag list with coloured dots (`tagColours` inside)          |
| `Form`, `Field`, `Input`, `Select`, `DeleteButton` | Form system → [Build a Form](Build-A-Form)                 |
| `theme.css`                                        | Colours, radii, fonts, animations, base styles             |

Site-only (not here): `ScrambleText`, `SocialButton`, layouts, project and
resource components.

## Add a component

1. `packages/ui/src/components/MyThing.tsx` (or `git mv` one across).
2. Relative imports only (`./Button`, `../types/forms`).
3. Keep `"use client"` if it uses hooks or handlers.
4. Use it: `import MyThing from "@repo/ui/components/MyThing";`
5. Tailwind classes just work (`@source`).
6. `pnpm typecheck && pnpm lint`
