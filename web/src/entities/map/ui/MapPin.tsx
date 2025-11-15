import { DynamicColorLevelTag, Icon } from "@/shared/ui";

function SelectedPin({ honbobLevel }: { honbobLevel: number }) {
  return (
    <div className="flex w-13 flex-col items-center gap-0.5">
      <DynamicColorLevelTag level={honbobLevel} size="small" />
      <Icon name="bubble" size={60} disableCurrentColor className="mx-auto" />
    </div>
  );
}

function UnselectedPin() {
  return <Icon name="marker" size={24} disableCurrentColor />;
}

function StoreName({ name }: { name: string }) {
  return (
    <span
      className="whitespace-nowrap rounded-sm text-caption2-semibold"
      style={{
        textShadow: `1px 0 var(--color-gray0), -1px 0 var(--color-gray0), 0 1px var(--color-gray0), 0 -1px var(--color-gray0), 1px 1px var(--color-gray0), -1px -1px var(--color-gray0), 1px -1px var(--color-gray0), -1px 1px var(--color-gray0)`,
      }}
    >
      {name}
    </span>
  );
}

interface MapPinProps {
  selected: boolean;
  name: string;
  honbobLevel: number;
}

export function MapPin({ selected, name, honbobLevel }: MapPinProps) {
  return (
    <article className="flex w-fit flex-col items-center justify-center gap-1">
      {selected ? <SelectedPin honbobLevel={honbobLevel} /> : <UnselectedPin />}
      <StoreName name={name} />
    </article>
  );
}
