"use client";

import type { MouseEvent } from "react";
import { twMerge } from "tailwind-merge";

type NavBarType = "standard" | "top";

export type NavItem = {
    label: string;
    targetId: string;
};

type NavBarProps = {
    items: NavItem[];
    children?: React.ReactNode;
    className?: string;
    type?: NavBarType;
};

const typeVariants: Record<NavBarType, string> = {
    standard: "rounded-card",
    top: "rounded-b-card",
};

export default function NavBar({
    items,
    children,
    className = "",
    type = "standard",
}: NavBarProps) {

    const handleScroll = (
        event: MouseEvent<HTMLButtonElement>,
        targetId: string
    ) => {
        event.preventDefault();

        const element = document.getElementById(targetId);

        if (!element) {
            return;
        }

        element.classList.remove("section-highlight");

        void element.offsetWidth;

        const distance = Math.abs(
            element.getBoundingClientRect().top
        );

        element.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });

        const animationDelay = Math.min(
            Math.max(distance * 0.5, 100),
            800
        );

        setTimeout(() => {

            element.classList.add("section-highlight");

            setTimeout(() => {
                element.classList.remove("section-highlight");
            }, 400);

        }, animationDelay);
    };

    return (
        <nav
            className={twMerge(`
                ${typeVariants[type]}

                w-full
                h-20

                bg-primary

                flex
                items-center

                px-4
                lg:px-16
            `, className)}
        >

            <div className="
                flex
                items-center

                w-full

                lg:w-auto
                lg:gap-20
            ">
                {items.map((item) => (
                    <button
                        key={item.targetId}
                        type="button"
                        onClick={(event) =>
                            handleScroll(event, item.targetId)
                        }
                        className="
                            flex-1

                            text-center
                            text-l
                            font-bold
                            text-white

                            transition-opacity
                            hover:opacity-70

                            lg:flex-none
                        "
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            {children}

        </nav>
    );
}