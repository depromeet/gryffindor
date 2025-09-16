import { ChipFilter, MAIN_HEADER_HEIGHT } from "@/shared/ui";

const LEVEL_LIST = ["레벨 1", "레벨 2", "레벨 3", "레벨 4"];

const DEFAULT_LEVEL = "레벨 1";

interface StoreLevelListProps {
  userLevel?: string;
}

export function StoreLevelList({ userLevel = DEFAULT_LEVEL }: StoreLevelListProps) {
  return (
    <div className={`sticky bg-gray0 py-[20px]`} style={{ top: `${MAIN_HEADER_HEIGHT}px` }}>
      <div className="flex flex-start items-center gap-x-[8px]">
        {LEVEL_LIST.map((level) => (
          <ChipFilter key={level} label={level} selected={level === userLevel} />
        ))}
      </div>
    </div>
  );
}
