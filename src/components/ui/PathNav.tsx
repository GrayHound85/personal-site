import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type PathNavType = "standard" | "top";

type PathNavProps = {
  // e.g. [{ label: "home", href: "/" }, { label: "projects" }]
  // The last segment is the current page and isn't a link.
  segments: { label: string; href?: string }[];
  className?: string;
  type?: PathNavType;
  // aria-label for the <nav>
  label?: string;
  // Extra controls shown on the right of the bar
  children?: ReactNode;
};

const typeVariants: Record<PathNavType, string> = {
  standard: "rounded-card",
  top: "rounded-b-card",
};

// A nav bar styled like NavBar, but showing where you are as a path
// (home / projects / homelab) with each parent segment clickable.
export default function PathNav({
  segments,
  className = "",
  type = "standard",
  label = "Breadcrumb",
  children,
}: PathNavProps) {
  return (
    <nav
      aria-label={label}
      className={twMerge(
        `
                ${typeVariants[type]}

                w-full
                h-20

                bg-action

                flex
                items-center

                px-6
                sm:px-7

                gap-2
                sm:gap-4

                font-mono
                text-base
                sm:text-lg
                text-white
            `,
        className,
      )}
    >
      {/*
        Wraps rather than cutting the page name off when the path is too long
        for the bar, e.g. home / projects / personal-site on a small phone.
      */}
      <ol className="flex min-w-0 flex-wrap items-center gap-x-1.5 sm:gap-x-2">
        {segments.map((segment, index) => (
          <Fragment key={segment.label}>
            {index > 0 && (
              <li aria-hidden="true" className="shrink-0 opacity-60">
                /
              </li>
            )}
            <li
              className={
                index === segments.length - 1
                  ? "max-w-full truncate"
                  : "shrink-0"
              }
            >
              {segment.href ? (
                <Link
                  href={segment.href}
                  className="opacity-80 transition-opacity hover:opacity-60"
                >
                  {segment.label}
                </Link>
              ) : (
                <span aria-current="page" className="font-bold">
                  {segment.label}
                </span>
              )}
            </li>
          </Fragment>
        ))}
      </ol>

      {children}
    </nav>
  );
}
