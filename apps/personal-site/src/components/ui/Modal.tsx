"use client";

import { useEffect } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ open, onClose, children }: ModalProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-50

        flex
        items-center
        justify-center

        bg-black/50
        p-3
        sm:p-6
      "
      onMouseDown={onClose}
    >
      <div
        className="
          relative
          
          w-full
          max-w-md
          max-h-[calc(100dvh-1.5rem)]
          overflow-y-auto
          rounded-card
          border
          border-white/10
          bg-[#071421]
          p-5
          pt-12
          pb-6
          sm:w-auto
          sm:max-w-none
          sm:max-h-none
          sm:overflow-visible
          sm:p-10
          sm:pt-13
          sm:pb-12
          shadow-card
        "
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="
            absolute
            right-2
            top-2

            flex
            h-8
            w-8
            items-center
            justify-center

            rounded-full

            text-text-secondary

            transition-colors
            hover:bg-white/10
            hover:text-text-primary
          "
        >
          <svg
            aria-hidden="true"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
            />
          </svg>
        </button>

        {children}
      </div>
    </div>
  );
}
