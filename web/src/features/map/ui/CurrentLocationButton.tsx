import { BOTTOM_NAV_HEIGHT } from "@/shared/config";
import { useWebview } from "@/shared/lib/hooks/useWebview";
import { Icon } from "@/shared/ui";
import { CURRENT_LOCATION_BUTTON_OFFSET } from "../config/offsetInfo";

interface CurrentLocationButtonProps {
  bottomOffset: number;
  onClick: () => void;
}

export function CurrentLocationButton({ bottomOffset, onClick }: CurrentLocationButtonProps) {
  const { isWebview } = useWebview();

  // TODO: 임시 구현, 나중에 Observer로 개선 예정
  const spacing = isWebview
    ? CURRENT_LOCATION_BUTTON_OFFSET.WEBVIEW_SPACING
    : CURRENT_LOCATION_BUTTON_OFFSET.DEFAULT_SPACING;
  const totalBottomOffset = (bottomOffset > 0 ? bottomOffset : BOTTOM_NAV_HEIGHT + 30) + spacing;

  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed right-5 z-40 flex items-center justify-center h-9 w-9 cursor-pointer rounded-full bg-gray0 shadow-fab transition-all duration-300"
      style={{
        bottom: `calc(${totalBottomOffset}px + env(safe-area-inset-bottom))`,
      }}
    >
      <Icon name="location" size={24} color="gray800" />
    </button>
  );
}
