import type { SVGProps } from "react";

interface DownChevronIconProps extends Omit<SVGProps<SVGSVGElement>, "ref"> {
  size?: number;
  title?: string;
}

export const DownChevronIcon = ({ size = 24, title, ...props }: DownChevronIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>{title || "DownChevron"}</title>
    <path
      d="M6 9L12 15L18 9"
      stroke="#101010"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
