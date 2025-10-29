import { MenuItem } from "@/entities/store/ui";

interface MenuSectionProps {
  menus: {
    name: string;
    price: number;
    imageUrl: string;
    description?: string;
    isRepresentative: boolean;
  }[];
  handleSetZoomImageSrc: (src: string) => void;
}

export function MenuSection({ menus, handleSetZoomImageSrc }: MenuSectionProps) {
  return (
    <article className="mt-5 flex w-full flex-col gap-3 pl-5">
      <span className="text-[#000] text-subtitle1">혼밥 메뉴</span>
      <div className="flex flex-col gap-3">
        {menus.map((menu) => (
          <MenuItem key={menu.name} {...menu} handleSetZoomImageSrc={handleSetZoomImageSrc} />
        ))}
      </div>
    </article>
  );
}
