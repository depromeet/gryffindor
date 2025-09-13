/**
 * 태그 컴포넌트
 *
 * @param {string} label - 태그에 들어갈 텍스트
 * @param {"red" | "gray" | "outline" | "blue"} [color="gray"] - 태그의 색상
 * @param {"small" | "medium"} [size="medium"] - 태그의 크기
 * @param {IconName} [iconName] - 아이콘 이름
 * @param {string} [className] - 추가 클래스명
 *
 * @example
 * // 기본 태그
 * <Tag label="기본 태그" />
 *
 * // 빨강 + 작은 태그 + 아이콘
 * <Tag label="중요" color="red" size="small" iconName="crown" />
 */

import { cn } from "@/shared/lib";
import { Icon, type IconName } from "@/shared/ui/Icon";

interface TagProps {
  label: string;
  color?: "red" | "gray" | "outline" | "blue";
  size?: "small" | "medium";
  iconName?: IconName;
  className?: string;
}

export function Tag({ label, color = "gray", size = "medium", iconName, className }: TagProps) {
  const styles = {
    size: {
      small: {
        container: "h-[19px] rounded-[3px]",
        padding: iconName ? "pl-0.5 pr-1" : "px-1",
        text: "text-caption2-semibold",
      },
      medium: {
        container: "h-[25px] rounded-[4px]",
        padding: iconName ? "pl-0.75 pr-1.25" : "px-1.25",
        text: "text-body3-semibold",
      },
    },
    color: {
      red: {
        container: "bg-primary100 text-primary400",
        icon: "primary400",
      },
      gray: {
        container: "bg-gray50 text-gray600",
        icon: "gray500",
      },
      outline: {
        container: "bg-gray0 text-primary400 border border-gray200 border-[1px]",
        icon: "primary400",
      },
      blue: {
        container: "bg-blue100 text-blue400",
        icon: "blue400",
      },
    },
  } as const;

  return (
    <div
      className={cn(
        "flex items-center gap-[1px] py-1",
        styles.size[size].container,
        styles.size[size].padding,
        styles.color[color].container,
        className,
      )}
    >
      {iconName && <Icon name={iconName} size={16} color={styles.color[color].icon} />}
      <p className={styles.size[size].text}>{label}</p>
    </div>
  );
}
