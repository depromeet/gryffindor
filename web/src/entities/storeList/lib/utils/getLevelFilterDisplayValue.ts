export const getLevelFilterDisplayValue = (honbobLevel: number[]) => {
  if (honbobLevel.length > 1) {
    return "커스텀";
  }
  return `레벨${honbobLevel[0] || 1}`;
};
