**File:** `apps/personal-site/src/app/page.tsx` → the `log` array.

```ts
{
  date: "2026-06",        // "YYYY-MM"
  kind: "award",          // "award" or "work"
  title: "Short, commit-message style title",
  details: [
    "One line each in the expanded view.",
    "Keep them short.",
  ],
},
```

- **Newest first.** Not sorted automatically; year groups follow array order.
- `date` = start month for long things; put the full range in `details`.
- Titles must be unique (used as the React key).

## New kind (e.g. `"hackathon"`)

In `apps/personal-site/src/components/sections/home/LogEntry.tsx`:

1. Add it to the `kind` union in `LogEntryProps`.
2. Add a badge style in `kindStyles`.
