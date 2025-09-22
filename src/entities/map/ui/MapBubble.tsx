import { Icon, Tag } from "@/shared/ui";

export function SelectedBubble({ honbobLevel }: { honbobLevel: number }) {
  return (
    <div className="flex w-13 flex-col items-center gap-0.5">
      <Tag
        label={`레벨 ${honbobLevel}`}
        color="outline"
        size="small"
        className="rounded-sm border-[1.4px] border-gray0 bg-primary400 px-1.5 py-0.5 text-gray0"
      />
      <Icon name="mapBubble" disableCurrentColor />
    </div>
  );
}

export function UnselectedBubble({ honbobLevel }: { honbobLevel: number }) {
  return (
    <div className="relative flex w-[63px] flex-col items-center gap-1">
      <div className="flex h-6 items-center gap-1 rounded-[13px] bg-primary400 px-1.5 py-1">
        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-gray0">
          <Icon name="crown" color="primary400" />
        </div>
        <span className="whitespace-nowrap text-caption1-bold text-gray0">레벨 {honbobLevel}</span>
      </div>
      <Icon name="downTriangle" color="primary400" className="absolute bottom-[-5px]" />
    </div>
  );
}
