import { SelectedBubble, UnselectedBubble } from "./MapBubble";

interface MapPinProps {
  selected: boolean;
  name: string;
  honbobLevel: number;
}

function StoreName({ name }: { name: string }) {
  return (
    <span
      className="rounded-sm text-caption2-semibold"
      style={{
        textShadow: `1px 0 var(--color-gray0), -1px 0 var(--color-gray0), 0 1px var(--color-gray0), 0 -1px var(--color-gray0), 1px 1px var(--color-gray0), -1px -1px var(--color-gray0), 1px -1px var(--color-gray0), -1px 1px var(--color-gray0)`,
      }}
    >
      {name}
    </span>
  );
}

export function MapPin({ selected, name, honbobLevel }: MapPinProps) {
  return (
    <article className="flex w-fit flex-col items-center justify-center gap-2">
      {selected ? (
        <SelectedBubble honbobLevel={honbobLevel} />
      ) : (
        <UnselectedBubble honbobLevel={honbobLevel} />
      )}
      <StoreName name={name} />
    </article>
  );
}
