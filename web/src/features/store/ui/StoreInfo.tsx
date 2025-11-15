import Image from "next/image";
import type { Menu } from "@/entities/store/model/types";
import { useWebview } from "@/shared/lib/hooks/useWebview";
import { ChipFilter, Icon, ImageWithFallback, Tag } from "@/shared/ui";

interface StoreInfoProps {
  thumbnailUrls: string[];
  menus: Menu[];
  name: string;
  level: number;
  address: string;
  phone: string;
  lat: number;
  lon: number;
  handleSetZoomImageSrc: (src: string) => void;
}

export function StoreInfo({
  thumbnailUrls,
  menus,
  name,
  level,
  address,
  phone,
  lat,
  lon,
  handleSetZoomImageSrc,
}: StoreInfoProps) {
  const { isWebview, postMessage } = useWebview();

  const renderImage = (src: string | undefined, alt: string, className: string) =>
    src ? (
      <ImageWithFallback
        src={src}
        alt={alt}
        width={186.5}
        height={224}
        className={className}
        onClick={() => handleSetZoomImageSrc(src)}
      />
    ) : (
      <div className={`${className} bg-gray-200`} />
    );

  const openNaverDirections = (toLat: number, toLng: number, toName: string) => {
    if (!navigator.geolocation) {
      alert("현재 위치를 가져올 수 없습니다.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const fromLat = pos.coords.latitude;
        const fromLng = pos.coords.longitude;
        const appUrl = `navermaps://route?slat=${fromLat}&slng=${fromLng}&sname=${encodeURIComponent(
          "현재위치",
        )}&dlat=${toLat}&dlng=${toLng}&dname=${encodeURIComponent(toName)}&mode=walk`;

        if (isWebview) {
          postMessage({
            type: "open-external-link",
            payload: {
              url: appUrl,
            },
          });
          return;
        }

        const webUrl = `https://map.naver.com/v5/directions/${fromLng},${fromLat}/${toLng},${toLat}/${encodeURIComponent(
          toName,
        )}/walk`;

        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
          window.location.href = appUrl;
          setTimeout(() => {
            window.location.href = webUrl;
          }, 1000);
        } else {
          window.open(webUrl, "_blank");
        }
      },
      (err) => {
        console.error(err);
        alert("위치 권한이 필요합니다.");
      },
    );
  };

  return (
    <article className="flex w-full flex-col gap-5">
      <section className="flex h-[224px] w-full shrink-0 gap-[2px]">
        {renderImage(menus[0].imageUrl, `${name}-thumbnail-1`, "h-full w-1/2 object-cover")}
        <div className="flex w-1/2 flex-col gap-[2px]">
          {renderImage(thumbnailUrls[0], `${name}-thumbnail-2`, "h-1/2 w-full object-cover")}
          {renderImage(thumbnailUrls[1], `${name}-thumbnail-3`, "h-1/2 w-full object-cover")}
        </div>
      </section>

      <section className="flex w-full flex-col gap-3 px-5">
        <div className="flex flex-col gap-2">
          <Tag label={`레벨 ${level}`} color="red" size="small" />
          <div className="flex items-center gap-2">
            <span className="flex-[1_0_0] text-[#000] text-title2">{name}</span>
            <ChipFilter
              label="길찾기"
              onClick={() => openNaverDirections(lat, lon, name)}
              selected
            />
          </div>
        </div>
        <div className="flex flex-col items-start gap-1">
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-2">
              <Icon name="pin" size={18} className="text-gray400" />
              <span className="text-[#4C4C4C] text-body2-medium whitespace-nowrap">위치</span>
            </div>
            <span className="text-[#4C4C4C] text-body2-medium">·</span>
            <span className="text-[#4C4C4C] text-body2-medium">{address}</span>
          </div>

          <div className="flex items-center gap-1">
            <div className="flex items-center gap-2">
              <Icon name="call" size={18} className="text-gray400" />
              <span className="text-[#4C4C4C] text-body2-medium">전화</span>
            </div>
            <span className="text-[#4C4C4C] text-body2-medium">·</span>
            <span className="text-[#4C4C4C] text-body2-medium">{phone || "번호 정보 없음"}</span>
          </div>
        </div>
      </section>
      <div className="h-1 w-full bg-gray50" />
    </article>
  );
}
