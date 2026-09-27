import type { SVGProps } from "react";

type ArrowDirection = "up" | "down" | "left" | "right";

type ArrowIconProps = SVGProps<SVGSVGElement> & {
  direction?: ArrowDirection;
};

export default function ArrowIcon({
  direction = "up",
  className,
  ...props
}: ArrowIconProps) {
  const rotation = {
    up: "",
    right: "rotate-90",
    down: "rotate-180",
    left: "-rotate-90",
  }[direction];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 14 14"
      className={`${rotation} ${className ?? ""} w-5 h-5`}
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M6.55806 0.190505c0.24407-0.2440732 0.63979-0.2440788 0.88387-0.000013L11.3606 4.10895c0.2441 0.24407 0.2441 0.6398 0 0.88388-0.244 0.24409-0.6398 0.2441-0.8838 0.00003L7.625 2.14127v11.22653c0 0.3452-0.27982 0.625-0.625 0.625s-0.625-0.2798-0.625-0.625V2.14133L3.52348 4.99285c-0.24407 0.24407-0.6398 0.24407-0.88388 0-0.24408-0.24408-0.24408-0.63981 0-0.88389L6.55806 0.190505Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
