import type { SVGProps } from "react";

export default function TickIcon(
    props: SVGProps<SVGSVGElement>
) {

    return (

        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >

            <path d="M20 6L9 17l-5-5" />

        </svg>

    );

}