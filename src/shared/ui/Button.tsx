/**
 * 버튼 컴포넌트
 *
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.label - 버튼의 레이블
 * @param {string} props.size - 버튼의 크기 (medium | large)
 * @param {boolean} props.disabled - disabled 상태 여부
 * @param {boolean} props.fullWidth - 버튼의 너비를 부모 컨테이너에 맞출지 여부
 * @param {string} props.variant - 버튼의 스타일 (primary | secondary)
 * @param {string} props.type - 버튼의 타입 (default: button)
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
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

import { cn } from "@/shared/lib/utils";

export function Button({
  label,
  size = "medium",
  disabled,
  fullWidth = false,
  variant = "primary",
  type = "button",
  onClick,
}: ButtonProps) {
  const variants = {
    primary: {
      active: {
        button: "bg-primary400",
        text: "text-gray0",
      },
      disabled: {
        button: "bg-gray100",
        text: "text-gray400",
      },
    },
    secondary: {
      active: {
        button: "bg-gray100",
        text: "text-gray800",
      },
      disabled: {
        button: "bg-gray50",
        text: "text-gray400",
      },
    },
  } as const;

  const sizeMap = {
    medium: "w-[160px]",
    large: "w-[335px]",
  } as const;

  const widthStyle = fullWidth ? "w-full" : sizeMap[size];

  const state = disabled ? "disabled" : "active";

  const variantStyle = variants[variant][state].button;
  const textStyle = variants[variant][state].text;

  return (
    <button
      type={type}
      className={cn(
        "flex items-center justify-center py-[14px] rounded-[8px] gap-[10px] transition-color duration-300 cursor-pointer",
        variantStyle,
        widthStyle,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <p className={cn("text-subtitle1 truncate", textStyle)}>{label}</p>
    </button>
  );
}
