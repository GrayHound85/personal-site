import type { SVGProps } from "react";

export default function DataTableIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className="w-6 h-6"
      {...props}
    >
      <path
        fill="currentColor"
        d="M4.5 21c-0.4 0 -0.75 -0.15 -1.05 -0.45 -0.3 -0.3 -0.45 -0.65 -0.45 -1.05V4.5c0 -0.4 0.15 -0.75 0.45 -1.05C3.75 3.15 4.1 3 4.5 3h15c0.4 0 0.75 0.15 1.05 0.45 0.3 0.3 0.45 0.65 0.45 1.05v15c0 0.4 -0.15 0.75 -0.45 1.05 -0.3 0.3 -0.65 0.45 -1.05 0.45H4.5Zm0 -12.5h15V4.5H4.5v4Zm0 5.5h15v-4H4.5v4Zm0 5.5h15v-4H4.5v4Zm1.575 -12.25v-1.5h1.5v1.5h-1.5Zm0 5.5v-1.5h1.5v1.5h-1.5Zm0 5.5v-1.5h1.5v1.5h-1.5Z"
      />
    </svg>
  );
}
