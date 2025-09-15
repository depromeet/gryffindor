import type { SVGProps } from "react";

interface CloseIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  title?: string;
  stroke?: string;
}

export const CloseIcon = ({
  size = 16,
  title,
  stroke = "currentColor",
  ...props
}: CloseIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <title>{title || "Close"}</title>
    <path
      d="M18 6L6 18M6 6L18 18"
      stroke={stroke}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
