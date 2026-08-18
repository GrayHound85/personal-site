import type { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type HeroPanelProps = HTMLAttributes<HTMLDivElement>;

export default function HeroPanel({
    children,
    className,
    ...props
}: HeroPanelProps) {

    return (
        <div
            className={twMerge(`
                rounded-card
                bg-gray-950/40
                p-8
                

                scroll-mt-28

                relative
                z-0

                transition-transform
                duration-300
            `, className)}
            {...props}
        >
            {children}
        </div>
    );
}