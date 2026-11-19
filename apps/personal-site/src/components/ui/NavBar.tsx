"use client";

import Link from "next/link";
import type { MouseEvent } from "react";

import PathNav from "./PathNav";

// Either scrolls to a section on this page (targetId) or links to another
// page (href)
export type NavItem =
  | { label: string; targetId: string }
  | { label: string; href: string };

const itemClassName = "opacity-80 transition-opacity hover:opacity-60";

type NavBarProps = {
  items: NavItem[];
  // The page's name, shown on the left like the last segment of a PathNav
  current?: string;
  className?: string;
  type?: "standard" | "top";
};

// The home page nav. It's a PathNav with just the current page on the left
// and the links on the right, so it looks the same as the path nav on the
// rest of the site and "home" stays in the same place when you navigate.
export default function NavBar({
  items,
  current = "home",
  className,
  type,
}: NavBarProps) {
  const handleScroll = (
    event: MouseEvent<HTMLButtonElement>,
    targetId: string,
  ) => {
    event.preventDefault();

    const element = document.getElementById(targetId);

    if (!element) {
      return;
    }

    // Remove and force a reflow so the highlight replays on repeat clicks
    element.classList.remove("section-highlight");
    void element.offsetWidth;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    element.classList.add("section-highlight");

    setTimeout(() => {
      element.classList.remove("section-highlight");
    }, 400);
  };

  return (
    <PathNav
      label="Main"
      segments={[{ label: current }]}
      className={className}
      type={type}
    >
      <div className="ml-auto flex items-center gap-5 sm:gap-8">
        {items.map((item) =>
          "href" in item ? (
            <Link key={item.label} href={item.href} className={itemClassName}>
              {item.label}
            </Link>
          ) : (
            <button
              key={item.label}
              type="button"
              onClick={(event) => handleScroll(event, item.targetId)}
              className={itemClassName}
            >
              {item.label}
            </button>
          ),
        )}
      </div>
    </PathNav>
  );
}
