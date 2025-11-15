import { ImageWithFallback, Tag } from "@/shared/ui";
import type { Menu } from "../model/types";

export function MenuItem({
  imageUrl,
  name,
  price,
  isRepresentative,
  handleSetZoomImageSrc,
}: Menu & { handleSetZoomImageSrc: (src: string) => void }) {
  return (
    <article className="flex items-center gap-4">
      <div className="h-[80px] w-[80px] bg-gray-100 rounded-[10px] relative">
        <ImageWithFallback
          src={imageUrl}
          alt={name}
          width={80}
          height={80}
          fallbackIconSize={40}
          className="h-[80px] w-[80px] rounded-[10px] object-cover cursor-pointer"
          onClick={() => imageUrl && handleSetZoomImageSrc(imageUrl)}
        />
      </div>

      <div className="flex flex-col items-start gap-1">
        <div className="flex items-center gap-1">
          <span className="text-body2-medium">{name}</span>
          {isRepresentative && <Tag label="대표" color="red" size="small" />}
        </div>
        <span className="text-subtitle1">{price.toLocaleString()}원</span>
      </div>
    </article>
  );
}
