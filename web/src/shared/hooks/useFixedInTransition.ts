import { useEffect, useRef } from "react";

/**
 * drill 애니메이션 환경에서 fixed 요소가 제대로 동작하도록 하는 hook
 *
 * SsgoiTransition의 transform 속성을 감시하고,
 * 애니메이션 완료 후에도 transform이 남아있으면
 * fixed 요소를 body로 이동시켜 viewport 기준으로 동작하게 합니다.
 *
 * @returns fixed 요소에 연결할 ref
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const fixedRef = useFixedInTransition();
 *
 *   return (
 *     <div ref={fixedRef} className="fixed bottom-0">
 *       Fixed Element
 *     </div>
 *   );
 * }
 * ```
 */
export function useFixedInTransition<
  T extends HTMLElement = HTMLDivElement,
>(): React.RefObject<T | null> {
  const ref = useRef<T | null>(null);
  const originalParentRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // SsgoiTransition 부모 찾기
    let transitionParent = element.parentElement;
    while (transitionParent && !transitionParent.hasAttribute("data-transition")) {
      transitionParent = transitionParent.parentElement;
    }

    if (!transitionParent) return;

    const isDrill = transitionParent.getAttribute("data-transition") === "drill";
    if (!isDrill) return;

    originalParentRef.current = element.parentElement;

    // transform 속성 감시
    const checkAndFix = () => {
      const computedStyle = window.getComputedStyle(transitionParent as HTMLElement);
      const transform = computedStyle.transform;

      // transform이 적용되어 있으면 (none이 아니면)
      if (transform && transform !== "none") {
        // fixed 요소를 body로 이동
        if (element.parentElement !== document.body) {
          // body로 이동 (Tailwind 클래스는 그대로 유지됨)
          document.body.appendChild(element);

          // inline style은 제거하여 Tailwind 클래스가 작동하도록 함
          element.style.top = "";
          element.style.left = "";
          element.style.right = "";
          element.style.bottom = "";
          element.style.width = "";
        }
      } else {
        // transform이 없으면 원래 위치로 복원
        if (originalParentRef.current && element.parentElement === document.body) {
          originalParentRef.current.appendChild(element);
        }
      }
    };

    // 초기 체크
    const initialTimer = setTimeout(checkAndFix, 50);

    // 애니메이션 완료 후 체크
    const animationTimer = setTimeout(checkAndFix, 400);

    // MutationObserver로 transform 변경 감시
    const observer = new MutationObserver(checkAndFix);
    observer.observe(transitionParent, {
      attributes: true,
      attributeFilter: ["style", "data-ssgoi-animating"],
    });

    // 주기적 체크 (fallback)
    const interval = setInterval(checkAndFix, 100);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(animationTimer);
      clearInterval(interval);
      observer.disconnect();

      // cleanup 시 원래 위치로 복원
      if (originalParentRef.current && element.parentElement === document.body) {
        originalParentRef.current.appendChild(element);
      }
    };
  }, []);

  return ref;
}
