/**
 * 텍스트 버튼 컴포넌트
 *
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.label - 버튼에 표시할 텍스트
 * @param {TextButtonColor} [props.color="gray"] - primary | gray | white 색상 적용
 *
 * @param {number} [props.rotateNumber] - 아이콘 회전 각도 (단위: 도)
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
 *   color="primary"
 *   onClick={() => console.log("clicked")}
 * />
 */
import { Icon } from "./Icon";

type TextButtonColor = "primary" | "gray" | "white";
interface TextButtonProps {
  label: string;
  color?: TextButtonColor;
  rotateNumber?: 0 | 90 | 180 | 270 | 360;
  isIcon?: boolean;
  isUnderline?: boolean;
  onClick: () => void;
}

export function TextButton({
  label,
  color = "gray",
  rotateNumber = 0,
  isIcon = true,
  isUnderline,
  onClick,
}: TextButtonProps) {
  const rotateClassMap = {
    0: "rotate-0",
    90: "rotate-90",
    180: "rotate-180",
    270: "rotate-270",
    360: "rotate-360",
  };

  const colorClassMap = {
    primary: "text-primary400",
    gray: "text-gray600",
    white: "text-white",
  };

  const iconColorClassMap = {
    primary: "primary400",
    gray: "gray400",
    white: "white",
  };

  return (
    <button
      type="button"
      className="flex cursor-pointer items-center justify-start gap-0.5"
      onClick={onClick}
    >
      <span
        className={`text-body2-medium ${colorClassMap[color]} ${isUnderline ? "underline underline-offset-2" : ""}`}
      >
        {label}
      </span>
      {isIcon && (
        <div className="h-4 w-4">
          <Icon
            name="downArrow"
            title="화살표"
            size={16}
            className={`transition-transform duration-300 ease-in-out ${
              rotateClassMap[rotateNumber]
            } ${iconColorClassMap[color]}`}
          />
        </div>
      )}
    </button>
  );
}
