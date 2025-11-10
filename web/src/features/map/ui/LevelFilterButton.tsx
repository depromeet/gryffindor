import { Icon } from "@/shared/ui";

interface LevelFilterButtonProps {
  honbabLevel: number;
  onClick: () => void;
}

export function LevelFilterButton({ honbabLevel, onClick }: LevelFilterButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed top-[85px] right-[19px] z-40 flex items-center gap-1 pl-3 pr-4 py-1.5 cursor-pointer rounded-[20px] bg-primary400 shadow-fab"
    >
      <Icon name="filter" size={24} color="gray0" />
      <span className="text-body2-medium text-gray0">레벨{honbabLevel}</span>
    </button>
  );
}
