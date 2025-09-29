import type { FilterData } from "@/features/filter/model/types";
import { Filter } from "@/features/filter/ui";
import { BottomSheet, BottomSheetContent } from "@/shared/ui";

interface FilterBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  initialFilters: FilterData;
  onApply: (filters: FilterData) => void;
}

export function FilterBottomSheet({
  isOpen,
  onClose,
  initialFilters,
  onApply,
}: FilterBottomSheetProps) {
  if (!isOpen) return null;

  return (
    <BottomSheet isFixed={true} isOpen={isOpen} onClose={onClose} expandedOffset={88}>
      <BottomSheetContent className="pb-7">
        <Filter initialFilters={initialFilters} onApply={onApply} onClose={onClose} />
      </BottomSheetContent>
    </BottomSheet>
  );
}
