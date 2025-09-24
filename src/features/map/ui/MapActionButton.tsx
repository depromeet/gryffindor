import { Icon } from "@/shared/ui";

interface MapActionButtonProps {
  type: "filter" | "target";
  onClick: () => void;
}

export function MapActionButton({ type, onClick }: MapActionButtonProps) {
  const getPositionStyle = () => {
    if (type === "filter") return { top: 85, right: 19 };
    if (type === "target") return { bottom: 242, right: 19 };
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed z-40 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gray0 shadow-[0_4px_12px_0_rgba(0,0,0,0.15)]"
      style={getPositionStyle()}
    >
      <Icon name={type} color="gray800" />
    </button>
  );
}
