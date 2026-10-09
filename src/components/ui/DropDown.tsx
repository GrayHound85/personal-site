"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
  type SelectHTMLAttributes,
} from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";

import DropDownOption, { type DropDownOptionProps } from "./DropDownOption";

type DropDownProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "children" | "defaultValue" | "onChange" | "value"
> & {
  children?: ReactNode;
  defaultValue?: string;
  placeholder?: string;
};

type MobileMenuPosition = {
  top: number;
  left: number;
  width: number;
  maxHeight: number;
};

export default function DropDown({
  children,
  className,
  defaultValue = "",
  disabled = false,
  id,
  name,
  placeholder = "Select an option",
  required = false,
  "aria-describedby": ariaDescribedBy,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  ...selectProps
}: DropDownProps) {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 767px)").matches,
  );
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [restoreFocus, setRestoreFocus] = useState(false);
  const [mobilePosition, setMobilePosition] =
    useState<MobileMenuPosition | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  const options = Children.toArray(children).filter(
    (child): child is React.ReactElement<DropDownOptionProps> =>
      isValidElement<DropDownOptionProps>(child) &&
      child.type === DropDownOption,
  );

  const selectedOption = options.find(
    (option) => option.props.value === selectedValue,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateViewport = () => setIsMobile(mediaQuery.matches);

    mediaQuery.addEventListener("change", updateViewport);
    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  useEffect(() => {
    if (!open || !isMobile) {
      return;
    }

    function updatePosition() {
      const trigger = triggerRef.current;

      if (!trigger) {
        return;
      }

      const rect = trigger.getBoundingClientRect();
      const margin = 12;
      const gap = 8;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const width = Math.min(rect.width, viewportWidth - margin * 2);
      const desiredHeight = Math.min(
        options.length * 40 + 16,
        viewportHeight * 0.55,
      );
      const spaceAbove = Math.max(0, rect.top - gap - margin);
      const spaceBelow = Math.max(
        0,
        viewportHeight - rect.bottom - gap - margin,
      );
      const opensAbove = spaceBelow < desiredHeight && spaceAbove > spaceBelow;
      const availableHeight = opensAbove ? spaceAbove : spaceBelow;
      const maxHeight = Math.min(desiredHeight, availableHeight);
      const left = Math.max(
        margin,
        Math.min(rect.left, viewportWidth - margin - width),
      );
      const top = opensAbove ? rect.top - gap - maxHeight : rect.bottom + gap;

      setMobilePosition({ top, left, width, maxHeight });
    }

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    window.visualViewport?.addEventListener("resize", updatePosition);
    window.visualViewport?.addEventListener("scroll", updatePosition);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
      window.visualViewport?.removeEventListener("resize", updatePosition);
      window.visualViewport?.removeEventListener("scroll", updatePosition);
    };
  }, [isMobile, open, options.length]);

  useEffect(() => {
    if (!open || !isMobile) {
      return;
    }

    function handleOutsidePointer(event: PointerEvent) {
      const target = event.target;

      if (
        target instanceof Node &&
        !triggerRef.current?.contains(target) &&
        !menuRef.current?.contains(target)
      ) {
        setOpen(false);
        setMobilePosition(null);
      }
    }

    document.addEventListener("pointerdown", handleOutsidePointer);
    return () =>
      document.removeEventListener("pointerdown", handleOutsidePointer);
  }, [isMobile, open]);

  useEffect(() => {
    if (!open && restoreFocus) {
      triggerRef.current?.focus();
    }
  }, [open, restoreFocus]);

  function handleSelect(value: string) {
    setRestoreFocus(true);
    setSelectedValue(value);
    setOpen(false);
    setMobilePosition(null);
  }

  function renderOptions() {
    return options.map((option) =>
      cloneElement(option, {
        onSelect: handleSelect,
        selected: option.props.value === selectedValue,
      }),
    );
  }

  function handleToggle() {
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    setIsMobile(mobile);
    setMobilePosition(null);
    setOpen(mobile ? !open : true);
  }

  function handleMouseEnter() {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      setIsMobile(false);
      setOpen(true);
    }
  }

  function handleMouseLeave() {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      setOpen(false);
    }
  }

  return (
    <div
      className="relative w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <select
        {...selectProps}
        id={id}
        name={name}
        value={selectedValue}
        onChange={(event) => setSelectedValue(event.target.value)}
        disabled={disabled}
        tabIndex={-1}
        aria-hidden="true"
        className="absolute h-0 w-0 opacity-0"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.props.value} value={option.props.value}>
            {option.props.children}
          </option>
        ))}
      </select>

      <button
        ref={triggerRef}
        id={id ? `${id}-button` : undefined}
        type="button"
        disabled={disabled}
        role="combobox"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-required={required || undefined}
        onClick={handleToggle}
        className={twMerge(
          "inline-flex w-full items-center justify-between rounded-button border border-border bg-panel px-4 py-3 text-sm font-medium text-text-primary shadow-sm transition-colors hover:bg-panel-hover focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
      >
        <span>
          {selectedOption ? selectedOption.props.children : placeholder}
        </span>
        <svg
          className={twMerge(
            "ml-2 h-4 w-4 shrink-0 transition-transform",
            open && "rotate-180",
          )}
          aria-hidden="true"
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

      {open && !isMobile && (
        <div
          ref={menuRef}
          className="absolute left-0 top-full z-10 w-full pt-2"
        >
          <div className="rounded-card_inner border border-border bg-panel shadow-lg">
            <ul id={menuId} role="listbox" className="p-2 text-sm font-medium">
              {renderOptions()}
            </ul>
          </div>
        </div>
      )}

      {open && isMobile && mobilePosition
        ? createPortal(
            <div
              ref={menuRef}
              className="fixed z-60"
              style={{
                top: mobilePosition.top,
                left: mobilePosition.left,
                width: mobilePosition.width,
              }}
            >
              <div
                className="overflow-y-auto rounded-card_inner border border-border bg-panel shadow-lg"
                style={{ maxHeight: mobilePosition.maxHeight }}
              >
                <ul
                  id={menuId}
                  role="listbox"
                  className="p-2 text-sm font-medium"
                >
                  {renderOptions()}
                </ul>
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
