import type { SVGProps } from "react";

interface SearchIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  title?: string;
}

export const SearchIcon = ({ size = 24, title, ...props }: SearchIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>{title || "Search"}</title>
    <path
      d="M5 11C5 11.7879 5.15519 12.5681 5.45672 13.2961C5.75825 14.0241 6.20021 14.6855 6.75736 15.2426C7.31451 15.7998 7.97595 16.2417 8.7039 16.5433C9.43185 16.8448 10.2121 17 11 17C11.7879 17 12.5681 16.8448 13.2961 16.5433C14.0241 16.2417 14.6855 15.7998 15.2426 15.2426C15.7998 14.6855 16.2417 14.0241 16.5433 13.2961C16.8448 12.5681 17 11.7879 17 11C17 10.2121 16.8448 9.43185 16.5433 8.7039C16.2417 7.97595 15.7998 7.31451 15.2426 6.75736C14.6855 6.20021 14.0241 5.75825 13.2961 5.45672C12.5681 5.15519 11.7879 5 11 5C10.2121 5 9.43185 5.15519 8.7039 5.45672C7.97595 5.75825 7.31451 6.20021 6.75736 6.75736C6.20021 7.31451 5.75825 7.97595 5.45672 8.7039C5.15519 9.43185 5 10.2121 5 11Z"
      stroke="#101010"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19 19L16 16"
      stroke="#101010"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
