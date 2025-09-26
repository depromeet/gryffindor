import { MAIN_HEADER_HEIGHT } from "@/shared/config";
import { ChipFilter } from "@/shared/ui";

const LEVEL_LIST = [1, 2, 3, 4];

interface StoreLevelListProps {
  userLevel: number;
  onLevelChange: (level: number) => void;
}

export function StoreLevelList({ userLevel, onLevelChange }: StoreLevelListProps) {
  return (
    <div className={`sticky z-50 bg-gray0 py-[20px]`} style={{ top: `${MAIN_HEADER_HEIGHT}px` }}>
      <div className="flex flex-start items-center gap-x-[8px] px-[20px]">
        {LEVEL_LIST.map((level) => (
          <ChipFilter
            key={level}
            label={`레벨 ${level}`}
            selected={level === userLevel}
            onClick={() => onLevelChange(level)}
          />
        ))}
      </div>
    </div>
  );
}
