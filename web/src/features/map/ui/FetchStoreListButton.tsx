import { useMapStore } from "@/features/map/model";
import { Icon } from "@/shared/ui";

interface FetchStoreListButtonProps {
  onClick: () => void;
  isFetching?: boolean;
}

export function FetchStoreListButton({ onClick, isFetching }: FetchStoreListButtonProps) {
  const { selectedStoreId, clearStore } = useMapStore();

  const handleClick = () => {
    if (selectedStoreId) clearStore();

    onClick();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="-translate-x-1/2 fixed top-[85px] left-1/2 z-40 flex h-9 w-[139px] cursor-pointer flex-row items-center gap-1 rounded-[20px] bg-gray0 py-1.5 pr-3 pl-2 shadow-[0_4px_12px_0_rgba(0,0,0,0.15)] transition-transform active:scale-90"
    >
      <Icon
        name="refresh"
        size={24}
        color="gray600"
        className={`${isFetching ? "animate-spin" : ""}`}
      />
      <span className="whitespace-nowrap text-body2-medium text-gray-900">
        {isFetching ? "불러오는 중..." : "현 지도에서 검색"}
      </span>
    </button>
  );
}
