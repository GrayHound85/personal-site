"use client";

import { useState } from "react";

import Card from "@/components/ui/Card";
import DividerLine from "@/components/ui/DividerLine";
import LinkButton from "@/components/ui/LinkButton";

type ResourceTopicDescriptionProps = {
  description: string | null;
  notesHref: string;
};

export default function ResourceTopicDescription({
  description,
  notesHref,
}: ResourceTopicDescriptionProps) {
  const [summaryOpen, setSummaryOpen] = useState(false);
  const summary = description?.trim() || "No summary has been added yet.";

  return (
    <Card className="w-full shrink-0 p-3 md:h-50 md:p-6">
      <div className="flex items-center gap-2 md:hidden">
        <button
          type="button"
          aria-expanded={summaryOpen}
          aria-controls="resource-summary"
          onClick={() => setSummaryOpen((open) => !open)}
          className="rounded-lg px-3 py-2 text-sm font-semibold text-text-secondary hover:bg-white/10"
        >
          {summaryOpen ? "Hide summary" : "Show summary"}
        </button>
        <LinkButton href={notesHref} className="ml-auto px-3 py-2 text-sm">
          Notes
        </LinkButton>
      </div>

      {summaryOpen && (
        <div id="resource-summary" className="mt-2 md:hidden">
          <DividerLine className="mb-2" />
          <p className="wrap-break-word text-sm leading-relaxed text-text-primary">
            {summary}
          </p>
        </div>
      )}

      <div className="hidden md:block">
        <div className="flex flex-col">
          <div className="flex flex-row">
            <h3 className="text-lg font-semibold text-text-secondary">
              Summary
            </h3>
            <LinkButton href={notesHref} className="ml-auto text-sm">
              Edit notes
            </LinkButton>
          </div>
          <DividerLine />
          <p className="truncate text-lg text-text-primary">{summary}</p>
        </div>
      </div>
    </Card>
  );
}
