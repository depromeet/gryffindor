export const REVIEW_KEYWORD_EN_KO_MAP: Record<string, string> = {
  FAST_TURNOVER: "🏃‍♂️ 빠른 회전률",
  SPACIOUS_STORE: "✨ 넓은 매장",
  KIND_SERVICE: "😊 친절한 응대",
  AFFORDABLE_MEAL: "💰 저렴한 한끼",
  GUARANTEED_TASTE: "👍 보증된 맛",
};

export const REVIEW_FILTERS = Object.values(REVIEW_KEYWORD_EN_KO_MAP);

export const REVIEW_KEYWORD_KO_EN_MAP: { [key: string]: string } = Object.fromEntries(
  Object.entries(REVIEW_KEYWORD_EN_KO_MAP).map(([key, value]) => [value, key]),
);
