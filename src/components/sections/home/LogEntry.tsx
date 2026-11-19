"use client";

import { useState } from "react";

import ScrambleText from "@c/ui/ScrambleText";

export type LogEntryProps = {
  // "YYYY-MM", used for sorting and grouping by year
  date: string;
  kind: "award" | "work";
  title: string;
  details: string[];
};

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const kindStyles = {
  award: "border-primary/60 text-primary",
  work: "border-white/20 text-text-secondary",
};

const REVEAL_SPEED = 6;

// One entry in the log, styled like a commit: the title is the commit
// message and the "…" button expands the details, like a commit body.
export default function LogEntry({
  date,
  kind,
  title,
  details,
}: LogEntryProps) {
  const [open, setOpen] = useState(false);

  const month = MONTHS[Number(date.slice(5, 7)) - 1];
  const year = date.slice(0, 4);

  return (
    <li
      className="
                reveal-on-scroll
                relative
                rounded-card_inner
                border
                border-white/10
                bg-panel/50

                before:absolute
                before:top-5
                before:-left-6.25
                before:h-2.25
                before:w-2.25
                before:rounded-full
                before:bg-primary
            "
    >
      <div className="flex items-start gap-4 p-4">
        <div className="min-w-0 flex-1">
          <p className="font-semibold leading-snug text-text-primary">
            {title}
          </p>
          <p className="mt-1 flex items-center gap-2 text-sm text-text-secondary">
            <span
              className={`rounded-full border px-2 font-mono text-xs ${kindStyles[kind]}`}
            >
              {kind}
            </span>
            {month} {year}
          </p>
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-label={open ? "Hide details" : "Show details"}
          onClick={() => setOpen(!open)}
          className={`
                        h-8
                        w-10
                        shrink-0
                        rounded-button
                        font-mono
                        text-lg
                        leading-none
                        transition-colors

                        ${open ? "bg-action text-white" : "bg-white/10 text-text-secondary hover:bg-white/20"}
                    `}
        >
          …
        </button>
      </div>

      {/* Mounted on open so the text reveals fresh every time */}
      {open && (
        <ul className="space-y-2 border-t border-white/10 px-4 py-3 font-mono text-sm leading-relaxed text-text-secondary">
          {details.map((line, index) => {
            // Each line starts once the lines before it have finished
            const charsBefore = details.slice(0, index).join("").length;

            return (
              <li key={line}>
                <ScrambleText
                  text={line}
                  speed={REVEAL_SPEED}
                  delay={charsBefore * REVEAL_SPEED}
                />
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
}
