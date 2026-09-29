"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useState,
  type ReactNode,
} from "react";
import { twMerge } from "tailwind-merge";

import DropDownOption, { type DropDownOptionProps } from "./DropDownOption";

type DropDownProps = {
  name: string;
  defaultValue?: string;
  children: ReactNode;
  placeholder?: string;
  className?: string;
  required?: boolean;
};

export default function DropDown({
  name,
  defaultValue = "",
  children,
  placeholder = "Select an option",
  className,
  required = false,
}: DropDownProps) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const options = Children.toArray(children).filter(
    (child): child is React.ReactElement<DropDownOptionProps> =>
      isValidElement(child) && child.type === DropDownOption,
  );

  const selectedOption = options.find(
    (option) => option.props.value === selectedValue,
  );

  function handleSelect(value: string) {
    setSelectedValue(value);
    setOpen(false);
  }

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <select
        name={name}
        value={selectedValue}
        onChange={(event) => setSelectedValue(event.target.value)}
        required={required}
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
        type="button"
        className={twMerge(
          `
            inline-flex
            w-full
            items-center
            justify-between
            rounded-xl
            border
            border-border
            bg-panel
            px-4
            py-3
            text-sm
            font-medium
            text-text-primary
            shadow-sm
            transition-colors
            hover:bg-panel-hover
            focus:outline-none
            focus:ring-2
            focus:ring-primary/30
          `,
          className,
        )}
        onClick={() => setOpen((current) => !current)}
      >
        <span>
          {selectedOption ? selectedOption.props.children : placeholder}
        </span>

        <svg
          className={twMerge(
            "ml-2 h-4 w-4 transition-transform",
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

      {open && (
        <div className="absolute left-0 top-full z-10 w-full pt-2">
          <div
            className="
              rounded-xl
              border
              border-border
              bg-[#031018]
              shadow-lg
            "
          >
            <ul className="p-2 text-sm font-medium">
              {options.map((option) =>
                cloneElement(option, {
                  onSelect: handleSelect,
                }),
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
