/**
 * 텍스트 버튼 컴포넌트
 *
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.label - 버튼에 표시할 텍스트
 * @param {boolean} [props.color=false] - true일 경우 primary 색상, false일 경우 gray 색상 적용
 * @param {0|90|180|270} [props.rotateNumber] - 아이콘 회전 각도 (단위: 도)
 * @param {boolean} [props.isIcon=true] - 아이콘 표시 여부
 * @param {boolean} [props.isUnderline=false] - 텍스트에 밑줄 표시 여부
 * @param {() => void} props.onClick - 버튼 클릭 이벤트 핸들러
 *
 * @example
 * // 기본 사용
 * <TextButton label="자세히 보기" onClick={() => console.log("clicked")} />
 *
 * // 아이콘 + 언더라인
 * <TextButton
 *   label="더보기"
 *   isIcon
 *   isUnderline
 *   rotateNumber={90}
 *   color
 *   onClick={() => console.log("clicked")}
 * />
 */

import { Icon } from "./Icon";

interface TextButtonProps {
  label: string;
  color?: boolean;
  rotateNumber?: 0 | 90 | 180 | 270;
  isIcon?: boolean;
  isUnderline?: boolean;
  onClick: () => void;
}

export function TextButton({
  label,
  color = false,
  rotateNumber,
  isIcon = true,
  isUnderline,
  onClick,
}: TextButtonProps) {
  const colorStyle = color ? "text-primary400" : "text-gray600";
  return (
    <article className="flex justify-start items-center gap-0.5 cursor-pointer">
      <button type="button" className="justify-start" onClick={onClick}>
        <p
          className={`text-body2-medium ${colorStyle} ${
            isUnderline ? "underline underline-offset-2" : ""
          }`}
        >
          {label}
        </p>
      </button>
      {isIcon && (
        <div className="w-4 h-4">
          <Icon
            name="arrow"
            title="화살표"
            size={16}
            className={`rotate-${rotateNumber} ${colorStyle}`}
          />
        </div>
      )}
    </article>
  );
}
