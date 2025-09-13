import type { SVGProps } from "react";

interface CheckIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  title?: string;
}

export const CheckIcon = ({ size = 16, title, ...props }: CheckIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <title>{title || "Check"}</title>
    <path
      d="M13.3333 4.66669L6.66659 11.3334L3.33325 8.00002"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
