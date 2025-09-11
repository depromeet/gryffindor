/**
 * 버튼 컴포넌트
 *
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.label - 버튼의 레이블
 * @param {string} props.size - 버튼의 크기 (medium | large)
 * @param {string} props.disabled - disabled 상태 여부
 * @param {boolean} props.fullWidth - 버튼의 너비를 부모 컨테이너에 맞출지 여부
 * @param {string} props.variant - 버튼의 타입 (primary | secondary)
 * @param {() => void} props.onClick - 클릭 이벤트 핸들러
 *
 * @example
 * // 기본 버튼
 * <Button label="확인" onClick={() => console.log("clicked")} />
 *
 * @example
 * // Large Secondary 버튼
 * <Button
 *   label="취소"
 *   size="large"
 *   variant="secondary"
 *   onClick={() => console.log("취소됨")}
 * />
 *
 * @example
 * // Disabled 버튼
 * <Button label="비활성" disabled />
 */

interface ButtonProps {
  label?: string;
  size?: "medium" | "large";
  disabled?: boolean;
  fullWidth?: boolean;
  variant?: "primary" | "secondary";
  onClick?: () => void;
}

export function Button({
  label,
  size,
  disabled,
  fullWidth = false,
  variant = "primary",
  onClick,
}: ButtonProps) {
  const bgMap = {
    primary: {
      active: "bg-primary400",
      disabled: "bg-gray100",
    },
    secondary: {
      active: "bg-gray100",
      disabled: "bg-gray50",
    },
  } as const;

  const textMap = {
    primary: {
      active: "text-gray0",
      disabled: "text-gray400",
    },
    secondary: {
      active: "text-gray800",
      disabled: "text-gray400",
    },
  } as const;

  const widthStyle = fullWidth ? "w-full" : size === "large" ? "w-[335px]" : "w-[160px]";

  const state = disabled ? "disabled" : "active";

  const variantStyle = bgMap[variant][state];
  const textStyle = textMap[variant][state];

  return (
    <button
      type="button"
      className={`flex items-center justify-center py-[14px] rounded-[8px] gap-[10px] transition-color duration-300 cursor-pointer ${variantStyle} ${widthStyle}`}
      onClick={onClick}
      disabled={disabled}
    >
      <p className={`whitespace-nowrap text-subtitle1 truncate ${textStyle}`}>{label}</p>
    </button>
  );
}
