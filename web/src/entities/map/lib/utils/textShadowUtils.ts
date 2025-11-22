/**
 * 텍스트 아웃라인 효과를 위한 text-shadow 값을 생성합니다.
 * 8방향으로 그림자를 적용하여 텍스트 주변에 아웃라인을 만듭니다.
 *
 * @param color - 그림자 색상 (CSS 변수 또는 색상 값)
 * @returns text-shadow CSS 값
 */
export function createTextOutlineShadow(color: string): string {
  const offsets = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [-1, -1],
    [1, -1],
    [-1, 1],
  ];
  return offsets.map(([x, y]) => `${x}px ${y}px ${color}`).join(", ");
}
