import type { SVGProps } from "react";

export default function BookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill="currentColor"
        d="M21.5 2h-16c-1.14772 0 -2 0.85228 -2 2s0.85228 2 2 2h15c0.5523 0 1 0.44772 1 1v16c0 0.5523 -0.4477 1 -1 1h-15c-2.25228 0 -4 -1.7477 -4 -4V4c0 -2.25228 1.74772 -4 4 -4h16z"
      />
    </svg>
  );
}
