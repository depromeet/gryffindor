/**
 * CTA 컴포넌트
 *
 * 주요 액션 버튼(Primary)과 선택적으로 보조 액션 버튼(Secondary)을 제공합니다.
 * - Secondary 버튼이 없으면 Primary 버튼이 전체 너비를 차지합니다.
 * - Secondary 버튼이 있으면 두 버튼이 각각 50% 너비를 차지합니다.
 *
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.primaryLabel - 주요 CTA 버튼 텍스트
 * @param {() => void} props.onPrimary - 주요 CTA 버튼 클릭 핸들러
 * @param {string} [props.secondaryLabel] - 보조 CTA 버튼 텍스트 (옵션)
 * @param {() => void} [props.onSecondary] - 보조 CTA 버튼 클릭 핸들러 (옵션)
 *
 * @example
 * // 단일 CTA 버튼
 * <CTA
 *   primaryLabel="완료"
 *   onPrimary={() => console.log("완료 클릭됨")}
 * />
 *
 * @example
 * // 이중 CTA 버튼 (취소 + 완료)
 * <CTA
 *   secondaryLabel="취소"
 *   onSecondary={() => console.log("취소 클릭됨")}
 *   primaryLabel="완료"
 *   onPrimary={() => console.log("완료 클릭됨")}
 * />
 */

import { Button } from "./Button";

interface CTAProps {
  primaryLabel: string;
  onPrimary: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
}

export function CTA({ primaryLabel, onPrimary, secondaryLabel, onSecondary }: CTAProps) {
  const size = secondaryLabel ? "medium" : "large";
  return (
    <article className="flex flex-col w-full gap-[10px] p-[20px] items-start bg-gray0 [box-shadow:-4px_0_20px_0_rgba(0,0,0,0.08)]">
      <div className="flex w-full items-center gap-[12px]">
        {secondaryLabel && (
          <Button
            label={secondaryLabel}
            size={size}
            fullWidth
            variant="secondary"
            onClick={onSecondary}
          />
        )}

        <Button label={primaryLabel} size={size} fullWidth variant="primary" onClick={onPrimary} />
      </div>
    </article>
  );
}
