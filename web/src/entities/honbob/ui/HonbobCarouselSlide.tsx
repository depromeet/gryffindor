import type { EmblaViewportRefType } from "embla-carousel-react";
import { HonbobLevelCard, honbobLevelCardList } from "@/entities/honbob";

interface HonbobCarouselSlideProps {
  ref: EmblaViewportRefType;
}

export function HonbobCarouselSlide({ ref }: HonbobCarouselSlideProps) {
  return (
    <div className="relative w-full overflow-hidden" ref={ref}>
      <div className="flex rounded-[16px]">
        {honbobLevelCardList.map((honbobLevelCard) => (
          <div
            className="relative shrink-0 w-full px-[20px] rounded-[16px]"
            key={honbobLevelCard.honbobLevel}
          >
            <HonbobLevelCard {...honbobLevelCard} />
          </div>
        ))}
      </div>
    </div>
  );
}
