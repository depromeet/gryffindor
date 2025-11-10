import { Icon } from "@/shared/ui";

export function CurrentLocationButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed bottom-[242px] right-[19px] z-40 flex items-center justify-center h-9 w-9 cursor-pointer rounded-full bg-gray0 shadow-fab"
    >
      <Icon name="location" size={24} color="gray800" />
    </button>
  );
}
