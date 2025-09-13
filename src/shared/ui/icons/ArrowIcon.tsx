import type { SVGProps } from "react";

interface ArrowIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  title?: string;
  stroke?: string;
}

export const ArrowIcon = ({
  size = 16,
  title,
  stroke = "currentColor",
  ...props
}: ArrowIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <title>{title || "Arrow"}</title>
    <path
      d="M12 6L8 10L4 6"
      stroke={stroke}
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
