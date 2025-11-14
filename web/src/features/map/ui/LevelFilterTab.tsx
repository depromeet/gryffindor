import { type HonbobLevelCardInfo, HonbobLevelFilterCard } from "@/entities/honbob";
import { CTA, FilterButton } from "@/shared/ui";

interface LevelFilterTabProps {
  selectedLevels: number[];
  handleLevelToggle: (level: number) => void;
  honbobLevelCardInfo?: HonbobLevelCardInfo;
  handleLevelReset: () => void;
  handleLevelFilterApply: () => void;
  isLevelFilterDirty: boolean;
}

export function LevelFilterTab({
  selectedLevels,
  handleLevelToggle,
  honbobLevelCardInfo,
  handleLevelReset,
  handleLevelFilterApply,
  isLevelFilterDirty,
}: LevelFilterTabProps) {
  return (
    <article className="flex flex-col">
      <div className="w-full flex flex-col p-5 gap-y-[16px]">
        <div className="flex w-full gap-x-[12px]">
          {[1, 2, 3, 4].map((level) => (
            <FilterButton
              key={level}
              label={`레벨${level}`}
              variant="outline"
              selected={selectedLevels.includes(level)}
              onClick={() => handleLevelToggle(level)}
              className="flex-1 min-w-0"
            />
          ))}
        </div>
        {honbobLevelCardInfo && (
          <div>
            <HonbobLevelFilterCard
              honbobLevel={honbobLevelCardInfo.honbobLevel}
              honbobLevelTitle={honbobLevelCardInfo.honbobLevelTitle}
              honbobLevelDescription={honbobLevelCardInfo.honbobLevelDescription}
              recommendedMenu={honbobLevelCardInfo.recommendedMenu}
              recommendedStore={honbobLevelCardInfo.recommendedStore}
            />
          </div>
        )}
      </div>
      <div className="mt-[51px]"></div>
      <div className="fixed right-0 bottom-0 left-0 z-50 mx-auto">
        <CTA
          secondaryLabel="초기화"
          primaryLabel="완료"
          onSecondary={handleLevelReset}
          onPrimary={handleLevelFilterApply}
          primaryDisabled={!isLevelFilterDirty}
        />
      </div>
    </article>
  );
}
