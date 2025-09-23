"use client";

import type { EmblaCarouselType } from "embla-carousel";
import { useCallback, useEffect, useState } from "react";

interface CarouselButtonState {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
}

export function useCarouselButton(emblaApi: EmblaCarouselType | undefined): CarouselButtonState {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onCarouselIndexButtonClick = useCallback(
    (carouselIndex: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(carouselIndex);
    },
    [emblaApi],
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    onInit(emblaApi);
    onSelect(emblaApi);

    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick: onCarouselIndexButtonClick,
  };
}
