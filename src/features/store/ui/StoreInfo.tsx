import Image from "next/image";
import { ChipFilter, Icon, Tag } from "@/shared/ui";

interface StoreInfoProps {
  thumbnails: string[];
  name: string;
  level: number;
  address: string;
  phone: string;
}

export function StoreInfo({ thumbnails, name, level, address, phone }: StoreInfoProps) {
  const renderImage = (src: string | undefined, alt: string, className: string) =>
    src ? (
      <Image src={src} alt={alt} width={186.5} height={224} className={className} />
    ) : (
      <div className={`${className} bg-gray-200`} />
    );

  return (
    <article className="flex w-full flex-col gap-5 pb-6">
      <section className="flex h-[224px] w-full shrink-0 gap-[2px]">
        {renderImage(thumbnails[0], `${name}-thumbnail-1`, "h-full w-1/2 object-cover")}
        <div className="flex w-1/2 flex-col gap-[2px]">
          {renderImage(thumbnails[1], `${name}-thumbnail-2`, "h-1/2 w-full object-cover")}
          {renderImage(thumbnails[2], `${name}-thumbnail-3`, "h-1/2 w-full object-cover")}
        </div>
      </section>

      <section className="flex w-full flex-col gap-3 px-5">
        <div className="flex flex-col gap-2">
          <Tag label={`레벨 ${level}`} color="red" size="small" />
          <div className="flex items-center gap-2">
            <span className="flex-[1_0_0] text-[#000] text-title2">{name}</span>
            <ChipFilter label="길찾기" onClick={() => {}} selected />
          </div>
        </div>
        <div className="flex flex-col items-start gap-1">
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-2">
              <Icon name="location" size={18} disableCurrentColor />
              <span className="text-[#4C4C4C] text-body2-medium">위치</span>
            </div>
            <span className="text-[#4C4C4C] text-body2-medium">·</span>
            <span className="text-[#4C4C4C] text-body2-medium">{address}</span>
          </div>

          <div className="flex items-center gap-1">
            <div className="flex items-center gap-2">
              <Icon name="call" size={18} disableCurrentColor />
              <span className="text-[#4C4C4C] text-body2-medium">전화</span>
            </div>
            <span className="text-[#4C4C4C] text-body2-medium">·</span>
            <span className="text-[#4C4C4C] text-body2-medium">{phone}</span>
          </div>
        </div>
      </section>
    </article>
  );
}
