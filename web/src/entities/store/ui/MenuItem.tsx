import Image from "next/image";
import { Tag } from "@/shared/ui";
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
      <Image
        src={imageUrl}
        alt={name}
        width={80}
        height={80}
        className="h-[80px] w-[80px] rounded-[10px] object-cover"
        onClick={() => handleSetZoomImageSrc(imageUrl)}
      />

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
