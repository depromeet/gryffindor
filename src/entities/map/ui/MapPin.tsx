import { Icon, Tag } from "@/shared/ui";

function SelectedPin({ honbobLevel }: { honbobLevel: number }) {
  return (
    <div className="flex w-13 flex-col items-center gap-0.5">
      <Tag
        label={`레벨 ${honbobLevel}`}
        color="outline"
        size="small"
        className="rounded-sm border-[1.4px] border-gray0 bg-primary400 px-1.5 py-0.5 text-gray0"
      />
      <Icon name="bubble" size={60} disableCurrentColor className="mx-auto" />
    </div>
  );
}

function UnselectedPin({ honbobLevel }: { honbobLevel: number }) {
  return (
    <div className="relative flex w-[63px] flex-col items-center gap-1">
      <div className="flex h-6 items-center gap-1 rounded-[13px] bg-primary400 px-1.5 py-1">
        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-gray0">
          <Icon name="crown" size={14} color="primary400" />
        </div>
        <span className="whitespace-nowrap text-caption1-bold text-gray0">레벨 {honbobLevel}</span>
      </div>
      <Icon name="bubblePick" size={12} color="primary400" className="absolute bottom-[-10px]" />
    </div>
  );
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
    <article className="flex w-fit flex-col items-center justify-center gap-2">
      {selected ? (
        <SelectedPin honbobLevel={honbobLevel} />
      ) : (
        <UnselectedPin honbobLevel={honbobLevel} />
      )}
      <StoreName name={name} />
    </article>
  );
}
