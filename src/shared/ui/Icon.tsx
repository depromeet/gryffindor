import { cn } from "@/shared/lib/utils";
import { ArrowIcon, CheckIcon, HomeIcon, MapIcon, SpeakerIcon, UserIcon } from "./icons";
// 사용 가능한 아이콘 이름들
export type IconName = "home" | "map" | "user" | "speaker" | "check" | "arrow";

// 아이콘 컴포넌트 Props
export interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  color?: string;
  title?: string;
}

// 아이콘 매핑 객체
const iconMap = {
  home: HomeIcon,
  map: MapIcon,
  user: UserIcon,
  speaker: SpeakerIcon,
  check: CheckIcon,
  arrow: ArrowIcon,
} as const;

export const Icon = ({ name, size = 24, className, color, title, ...props }: IconProps) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Icon with name "${name}" not found`);
    return null;
  }

  return (
    <IconComponent
      size={size}
      className={cn(color && `text-${color}`, className)}
      title={title}
      {...props}
    />
  );
};
