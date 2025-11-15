import { cn } from "@/shared/lib";
import { Icon } from "@/shared/ui";

interface LevelFilterButtonProps {
  honbobLevel: number | string;
  onClick: () => void;
  isShadowed?: boolean;
}

export function LevelFilterButton({
  honbobLevel,
  onClick,
  isShadowed = true,
}: LevelFilterButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-1 pl-3 pr-4 py-1.5 cursor-pointer rounded-[20px] bg-primary400",
        isShadowed && "shadow-fab",
      )}
    >
      <Icon name="filter" size={24} color="gray0" />
      <span className="text-body2-medium text-gray0">{honbobLevel}</span>
    </button>
  );
}
