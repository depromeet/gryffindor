/**
 * 동적 색상 레벨 태그 컴포넌트
 *
 * @param {number} level - 레벨 (1-4)
 */

import { cn } from "@/shared/lib";
import { Icon } from "@/shared/ui/Icon";

interface DynamicColorLevelTagProps {
  level: number | string;
  size?: "small" | "medium";
}

type Level = 1 | 2 | 3 | 4;

const normalizeLevel = (level: number | string): Level => {
  if (typeof level === "string") {
    return Number(level.replace("Lv.", "")) as Level;
  }
  return level as Level;
};

export function DynamicColorLevelTag({ level, size = "medium" }: DynamicColorLevelTagProps) {
  const normalizedLevel = normalizeLevel(level);

  const styles = {
    level: {
      1: {
        container: " bg-gray50",
        icon: "gray600",
        text: "text-gray700",
      },
      2: {
        container: "bg-[#FFECC9]",
        icon: "[#C35800]",
        text: "text-[#C35800]",
      },
      3: {
        container: "bg-[#FFE7D3]",
        icon: "[#EF7000]",
        text: "text-[#EF7000]",
      },
      4: {
        container: "bg-[#FFE8E3]",
        icon: "[#FF5532]",
        text: "text-[#FF5532]",
      },
    },
    size: {
      small: {
        container: " h-[19px] rounded-[3px] w-fit text-caption2-semibold pl-0.5 pr-1",
      },
      medium: {
        container: "pl-0.75 pr-1.25 h-[25px] rounded-[4px] w-fit text-body3-semibold",
      },
    },
  };

  return (
    <div
      className={cn(
        "flex items-center gap-[1px] py-1",
        styles.size[size].container,
        styles.level[normalizedLevel].container,
      )}
    >
      <Icon name="crown" size={16} color={styles.level[normalizedLevel].icon} />
      <p className={cn(styles.level[normalizedLevel].text)}>{`레벨 ${normalizedLevel}`}</p>
    </div>
  );
}
