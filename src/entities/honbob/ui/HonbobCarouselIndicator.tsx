interface HonbobCarouselIndicatorProps {
  scrollSnaps: number[];
  selectedIndex: number;
  onDotButtonClick: (index: number) => void;
}

export function HonbobCarouselIndicator({
  scrollSnaps,
  selectedIndex,
  onDotButtonClick,
}: HonbobCarouselIndicatorProps) {
  return (
    <div className="flex gap-x-[4px]">
      {scrollSnaps.map((_, index) => (
        <button
          type="button"
          aria-label={`혼밥 레벨 ${index + 1} 보기`}
          key={index.toString()}
          onClick={() => onDotButtonClick(index)}
          className={`h-[4px] rounded-full transition-all duration-200 ${
            index === selectedIndex ? "bg-gray800" : "bg-gray200"
          }`}
          style={{
            width: index === selectedIndex ? "16px" : "4px",
          }}
        />
      ))}
    </div>
  );
}
