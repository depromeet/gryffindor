import { Icon, type IconName } from "@/shared/ui";

interface MapFloatingButtonProps {
  iconName: IconName;
  position: { top?: number; left?: number; right?: number; bottom?: number };
  onClick: () => void;
}

export function MapFloatingButton({ iconName, position, onClick }: MapFloatingButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed z-49 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gray0 shadow-[0_4px_12px_0_rgba(0,0,0,0.15)]"
      style={position}
    >
      <Icon name={iconName} color="gray800" />
    </button>
  );
}
