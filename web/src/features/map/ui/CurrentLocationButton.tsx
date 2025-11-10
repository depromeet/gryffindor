import { Icon } from "@/shared/ui";

export function CurrentLocationButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed right-[19px] z-40 flex items-center justify-center h-9 w-9 cursor-pointer rounded-full bg-gray0 shadow-fab"
      style={{
        bottom: "calc(330px + var(--safe-area-inset-bottom))",
      }}
    >
      <Icon name="location" size={24} color="gray800" />
    </button>
  );
}
