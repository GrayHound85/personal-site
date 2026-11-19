"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { twMerge } from "tailwind-merge";

import { fieldClassName } from "./Input";

// badge shows a small pill after the label, e.g. { label: "Programming",
// badge: "category" }
export type SelectOption = { value: string; label: string; badge?: string };

function OptionLabel({ option }: { option: SelectOption }) {
  return (
    <span className="flex min-w-0 items-center gap-2">
      <span className="truncate">{option.label}</span>
      {option.badge && (
        <span className="shrink-0 rounded-full border border-white/20 px-2 font-mono text-xs text-text-secondary">
          {option.badge}
        </span>
      )}
    </span>
  );
}

type SelectProps = {
  name: string;
  options: SelectOption[];
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
};

// A custom dropdown styled like Input, with the option list fully styled to
// match the site (a native <select>'s list is drawn by the browser).
// The chosen value is submitted with the form under `name`.
export default function Select({
  name,
  options,
  placeholder = "Select an option",
  defaultValue = "",
  required = false,
  disabled = false,
  className,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);

  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const listId = useId();

  const selected = options.find((option) => option.value === value);

  // Close when clicking anywhere outside the dropdown
  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  // When the list opens, focus the selected option (or the first one) so the
  // arrow keys work straight away
  useEffect(() => {
    if (!open) return;

    const index = options.findIndex((option) => option.value === value);
    optionRefs.current[Math.max(index, 0)]?.focus();
  }, [open, options, value]);

  function choose(option: SelectOption) {
    setValue(option.value);
    setOpen(false);
    triggerRef.current?.focus();
  }

  function handleTriggerKeyDown(event: KeyboardEvent) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
    }
  }

  function handleListKeyDown(event: KeyboardEvent) {
    const index = optionRefs.current.indexOf(
      document.activeElement as HTMLButtonElement,
    );

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const next =
        event.key === "ArrowDown"
          ? Math.min(index + 1, options.length - 1)
          : Math.max(index - 1, 0);
      optionRefs.current[next]?.focus();
    } else if (event.key === "Escape") {
      // Stop it reaching Modal, which would close the whole modal
      event.stopPropagation();
      setOpen(false);
      triggerRef.current?.focus();
    } else if (event.key === "Tab") {
      setOpen(false);
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen(!open)}
        onKeyDown={handleTriggerKeyDown}
        className={twMerge(
          fieldClassName,
          "flex items-center justify-between gap-3 text-left",
          !selected && "text-text-secondary/50",
          className,
        )}
      >
        {selected ? (
          <OptionLabel option={selected} />
        ) : (
          <span className="truncate">{placeholder}</span>
        )}
        <svg
          aria-hidden="true"
          className={`h-4 w-4 shrink-0 text-text-secondary transition-transform duration-150 ${open ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="m19 9-7 7-7-7"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      </button>

      {/*
        Holds the value for the form submit. It's an invisible text input
        rather than type="hidden" because browsers skip hidden inputs when
        checking `required`. If validation focuses it, focus moves to the
        button instead.
      */}
      <input
        name={name}
        value={value}
        required={required}
        onChange={() => {}}
        onFocus={() => triggerRef.current?.focus()}
        tabIndex={-1}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px opacity-0"
      />

      {/* In the page flow on mobile (so it can't be cut off), floating from sm up */}
      {open && (
        <ul
          id={listId}
          role="listbox"
          onKeyDown={handleListKeyDown}
          className="z-20 mt-2 space-y-1 rounded-card_inner border border-white/10 bg-[#071421] p-1 shadow-card sm:absolute sm:inset-x-0 sm:top-full"
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;

            return (
              <li key={option.value} role="presentation">
                <button
                  ref={(element) => {
                    optionRefs.current[index] = element;
                  }}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => choose(option)}
                  className={`
                                        flex
                                        w-full
                                        items-center
                                        justify-between
                                        rounded-button
                                        px-3
                                        py-2
                                        text-left
                                        transition-colors
                                        outline-none

                                        hover:bg-white/10
                                        hover:text-text-primary
                                        focus:bg-white/10
                                        focus:text-text-primary

                                        ${isSelected ? "text-text-primary" : "text-text-secondary"}
                                    `}
                >
                  <OptionLabel option={option} />
                  {isSelected && (
                    <svg
                      aria-hidden="true"
                      className="h-4 w-4 text-primary"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="m5 12 5 5 9-10"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </svg>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
