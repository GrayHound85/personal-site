"use client";

import { useState } from "react";

type ExpandableTextProps = {
    children: React.ReactNode;
};

export default function ExpandableText({
    children,
}: ExpandableTextProps) {

    const [expanded, setExpanded] = useState(false);

    return (
        <div>
            <div
                className={`
                    overflow-hidden
                    transition-[max-height]
                    duration-500
                    ease-in-out

                    ${
                        expanded
                            ? "max-h-[2000px]"
                            : "max-h-[140px]"
                    }
                `}
            >
                {children}
            </div>

            <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className="
                    mt-4

                    font-semibold
                    text-primary

                    transition-opacity
                    hover:opacity-70
                "
            >
                {expanded ? "Show less ↑" : "See more ↓"}
            </button>
        </div>
    );
}