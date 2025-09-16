import { cn } from "@/shared/lib";
import { iconMap } from "./icons";

// 사용 가능한 아이콘 이름들
export type IconName = keyof typeof iconMap;

// 아이콘 컴포넌트 Props
export interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  color?: string;
  title?: string;
  disableCurrentColor?: boolean; // SVG 기본 색상 사용하고 싶을 때
}

export const Icon = ({
  name,
  className,
  color,
  title,
  disableCurrentColor,
  ...props
}: IconProps) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Icon with name "${name}" not found`);
    return null;
  }

  return (
    <IconComponent
      className={cn(
        // 기본 Tailwind 스타일링 지원
        // disableCurrentColor가 true면 currentColor 적용 안함
        !disableCurrentColor &&
          "[&>*]:fill-current [&>circle]:fill-current [&>path]:fill-current [&>rect]:fill-current",
        color && `text-${color}`,
        className
      )}
      title={title}
      {...props}
    />
  );
};
