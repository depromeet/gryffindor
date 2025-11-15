import { useCallback, useEffect, useRef } from "react";

/**
 * drill 애니메이션 환경에서 fixed 요소가 제대로 동작하도록
 * 강제 리플로우를 트리거하는 hook
 *
 * transform이 적용된 부모 요소 내에서 fixed가 깨지는 문제를
 * 애니메이션 완료 후 강제로 레이아웃을 재계산하여 해결합니다.
 *
 * @param delay - 리플로우 트리거 지연 시간 (ms), 기본값 350ms
 * @returns fixed 요소에 연결할 ref
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const fixedRef = useFixedPosition();
 *
 *   return (
 *     <div ref={fixedRef} className="fixed bottom-0">
 *       Fixed Element
 *     </div>
 *   );
 * }
 * ```
 */
export function useFixedPosition<T extends HTMLElement = HTMLDivElement>(
  delay = 350,
): React.RefObject<T | null> {
  const ref = useRef<T | null>(null);

  // 리플로우를 트리거하는 함수
  const triggerReflow = useCallback((element: T) => {
    // 1. 현재 position 저장
    const currentPosition = element.style.position;

    // 2. position을 static으로 변경 (레이아웃 재계산 트리거)
    element.style.position = "static";

    // 3. offsetHeight 읽기 (강제 리플로우)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _ = element.offsetHeight;

    // 4. 원래 position으로 복원
    element.style.position = currentPosition || "fixed";
  }, []);

  useEffect(() => {
    // 1. 즉시 리플로우 (최초 렌더링 시 fixed position이 제대로 작동하도록)
    if (ref.current) {
      triggerReflow(ref.current);
    }

    // 2. delay 후 다시 리플로우 (drill 애니메이션 완료 후 재확인)
    const timer = setTimeout(() => {
      if (ref.current) {
        triggerReflow(ref.current);
      }
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [delay, triggerReflow]);

  return ref;
}
