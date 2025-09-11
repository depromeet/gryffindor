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

"use client";

interface CTAProps {
  primaryLabel: string;
  onPrimary: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
}

export function CTA({ primaryLabel, onPrimary, secondaryLabel, onSecondary }: CTAProps) {
  return (
    <article className="flex flex-col w-full gap-2.5 p-5 items-start bg-gray0 [box-shadow:-4px_0_20px_0_rgba(0,0,0,0.08)]">
      <div className="flex w-full itms-center gap-3">
        {secondaryLabel && (
          <button
            type="button"
            className="flex-1 py-3.5 rounded-[8px] bg-gray100 cursor-pointer"
            onClick={onSecondary}
          >
            <p className="text-body1-semibold text-gray800 truncate">{secondaryLabel}</p>
          </button>
        )}

        <button
          type="button"
          className={`py-3.5 rounded-[8px] bg-primary400 cursor-pointer ${
            secondaryLabel ? "flex-1" : "w-full"
          }`}
          onClick={onPrimary}
        >
          <span className="text-body1-semibold text-gray0 truncate">{primaryLabel}</span>
        </button>
      </div>
    </article>
  );
}
