import type { SVGProps } from "react";

interface CrownIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  title?: string;
  color?: string;
}

export const CrownIcon = ({
  size = 16,
  title,
  color = "currentColor",
  ...props
}: CrownIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    role="img"
    {...props}
  >
    <title>{title || "Crown"}</title>
    <circle opacity="0.5" cx="2.52463" cy="6.79318" r="0.520232" fill={color} />
    <circle cx="13.4841" cy="6.79312" r="0.520232" fill={color} />
    <circle cx="8.00419" cy="4.47654" r="0.693642" fill={color} />
    <path
      opacity="0.5"
      d="M4.23975 12.3027H7.89506C8.02054 12.3027 8.12226 12.4045 8.12226 12.5299V12.9843C8.12226 13.1098 8.02054 13.2115 7.89506 13.2115H4.23975V12.3027Z"
      fill={color}
    />
    <path
      d="M8.00488 12.3027H11.6602C11.7857 12.3027 11.8874 12.4045 11.8874 12.5299V12.9843C11.8874 13.1098 11.7857 13.2115 11.6602 13.2115H8.00488V12.3027Z"
      fill={color}
    />
    <path
      opacity="0.5"
      d="M8.06361 11.8483V5.37323H7.99097C7.85117 5.37323 7.71915 5.43758 7.63303 5.5477L6.38413 7.14466C5.90988 7.75108 5.10504 7.99295 4.37508 7.74842L3.12769 7.33056C2.95273 7.27195 2.78457 7.43532 2.8381 7.6119L4.12227 11.8483H8.06361Z"
      fill={color}
    />
    <path
      d="M8.06286 11.8483V5.37323H8.1355C8.27529 5.37323 8.40731 5.43758 8.49343 5.5477L9.74234 7.14466C10.2166 7.75108 11.0214 7.99295 11.7514 7.74842L12.9988 7.33056C13.1737 7.27195 13.3419 7.43532 13.2884 7.6119L12.0042 11.8483H8.06286Z"
      fill={color}
    />
  </svg>
);
