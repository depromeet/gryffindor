import { Icon } from "@/shared/ui";

interface MapRefreshButtonProps {
  onClick: () => void;
}

export function MapRefreshButton({ onClick }: MapRefreshButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="-translate-x-1/2 fixed top-[85px] left-1/2 z-40 flex h-9 w-[139px] cursor-pointer flex-row items-center gap-1 rounded-[20px] bg-gray0 py-1.5 pr-3 pl-2 shadow-[0_4px_12px_0_rgba(0,0,0,0.15)]"
    >
      <Icon name="refresh" color="gray600" />
      <span className="whitespace-nowrap text-body2-medium text-gray-900">현 지도에서 검색</span>
    </button>
  );
}
