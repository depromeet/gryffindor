"use client";

import useEmblaCarousel from "embla-carousel-react";
import { HonbobCarouselIndicator, HonbobCarouselSlide, useCarouselButton } from "@/entities/honbob";

export function HonbobLevelCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
  });
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useCarouselButton(emblaApi);

  return (
    <div className="relative flex w-full flex-col items-center gap-y-[14px]">
      <HonbobCarouselSlide ref={emblaRef} />
      <HonbobCarouselIndicator
        scrollSnaps={scrollSnaps}
        selectedIndex={selectedIndex}
        onDotButtonClick={onDotButtonClick}
      />
    </div>
  );
}
