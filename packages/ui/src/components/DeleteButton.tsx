"use client";

import { useState } from "react";

import Form from "./Form";
import type { FormState } from "../types/forms";

type DeleteButtonProps = {
  // A server action with the id already bound,
  // e.g. deleteTopicAction.bind(null, topic.id)
  action: () => Promise<FormState>;
  // What's being deleted, shown in the confirmation, e.g. "JavaScript"
  name: string;
  onDeleted: () => void;
};

// A "Delete" button that asks for confirmation before running the action.
// If the action refuses (e.g. "still has 3 topics") the message shows above
// the confirm button.
export default function DeleteButton({
  action,
  name,
  onDeleted,
}: DeleteButtonProps) {
  const [confirming, setConfirming] = useState(false);

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="w-full rounded-button border border-red-300/30 px-4 py-2.5 text-sm text-red-200 transition-colors hover:bg-red-300/10"
      >
        Delete
      </button>
    );
  }

  return (
    <Form
      action={action}
      submitText="Yes, delete"
      pendingText="Deleting..."
      onSuccess={onDeleted}
      submitClassName="bg-red-400/80 hover:bg-red-400"
      className="gap-4"
    >
      <p className="text-sm leading-relaxed text-text-secondary">
        Delete <strong className="text-text-primary">{name}</strong>? This
        can&apos;t be undone.{" "}
        <button
          type="button"
          onClick={() => setConfirming(false)}
          className="text-primary underline underline-offset-4 hover:opacity-70"
        >
          Cancel
        </button>
      </p>
    </Form>
  );
}
