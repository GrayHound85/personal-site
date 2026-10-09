import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { ComponentProps } from "react";

type LinkButtonProps = ComponentProps<typeof Link> & {
  children: React.ReactNode;
  className?: string;
};
export default function LinkButton({
  href,
  children,
  className,
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={twMerge(`
                inline-flex
                items-center
                justify-center

                rounded-button

                bg-action

                px-6
                py-3

                font-medium
                text-white

                transition-colors

                hover:bg-primary-hover

                ${className ?? ""}
            `)}
    >
      {children}
    </Link>
  );
}
