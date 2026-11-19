- **Look:** blue palette and translucent panels (`packages/ui/src/theme.css`),
  Helvetica, plus a light GitHub-repo layer: mono labels, `README.md` /
  `<id>.md` header strips, tag dots, commit-style log.
- **Never show the GitHub handle as text.** Paths start at `home`.
- Not generic / AI-looking. No blinking cursors.
- Every page has the path nav bar (`PathNav`).
- Private pages (dashboard, career) are full width; project pages are a
  centred `max-w-7xl` column (`contained`).
- Unbuilt tools get a `planned` badge; built ones get none.
- Animations: `fade-up`, `reveal-on-scroll`, `draw-on-scroll` in
  `theme.css`, all off under reduced motion. `ScrambleText` only on mono text.
- Code: default-export components, props type above, multi-line Tailwind
  template strings, `twMerge` for `className`. Light abstraction.
