export const REVIEW_KEYWORD_MAP: Record<string, string> = {
  GOOD_FOR_SOLO: "🏃‍♂️ 빠른 회전률",
  OPEN_ATMOSPHERE: "✨ 넓은 매장",
  KIND_SERVICE: "😊 친절한 응대",
  NICE_STAFF: "💰 저렴한 한끼",
  BEST_TASTE: "👍 보증된 맛",
};

export const REVIEW_FILTERS = Object.values(REVIEW_KEYWORD_MAP);

export const KEYWORD_MAP: { [key: string]: string } = Object.fromEntries(
  Object.entries(REVIEW_KEYWORD_MAP).map(([key, value]) => [value, key]),
);
