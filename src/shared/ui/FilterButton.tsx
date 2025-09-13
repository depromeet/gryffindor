/**
 * 필터 버튼 컴포넌트
 *
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.label - 버튼의 레이블
 * @param {boolean} props.selected - 선택 여부
 * @param {() => void} props.onClick - 버튼 클릭 이벤트 핸들러
 * @param {"fill" | "outline"} props.variant - 버튼 스타일 (fill 또는 line)
 * @param {string} props.type - 버튼의 타입 (default: button)
 * @param {boolean} [props.disabled] - 비활성화 여부 (선택적)
 *
 * @example
 * const [selectedFill, setSelectedFill] = useState<string[]>([]);
 * const options = ['1단계', '2단계', '3단계'];
 *
 * return (
 *   <>
 *     {options.map(option) => (
 *       <FilterButton
 *         key={option}
 *         label={option}
 *         selected={selectedFill.includes(option)}
 *         variant="fill" or "line"
 *         onClick={() =>
 *           setSelectedFill(prev =>
 *             prev.includes(option)
 *               ? prev.filter(v => v !== option)
 *               : [...prev, option]
 *           )
 *         }
 *       />
 *     ))}
 *   </>
 * );
 */

import { cn } from "@/shared/lib";

interface FilterButtonProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  variant: "fill" | "outline";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function FilterButton({
  label,
  selected,
  onClick,
  variant,
  type = "button",
  disabled = false,
}: FilterButtonProps) {
  const bgMap = {
    fill: {
      primary: { button: "bg-primary400", text: "text-gray0" },
      gray: { button: "bg-gray100", text: "text-gray800" },
      disabled: { button: "bg-gray50", text: "text-gray400" },
    },
    outline: {
      primary: {
        button: "bg-primary100 border border-primary300 border-[1.4px]",
        text: "text-primary500",
      },
      gray: {
        button: "bg-gray0 border border-gray100 border-[1px]",
        text: "text-gray600",
      },
      disabled: {
        button: "bg-gray0 border border-gray100 border-[1px]",
        text: "text-gray400",
      },
    },
  } as const;

  const state = disabled ? "disabled" : selected ? "primary" : "gray";

  const variantStyle = bgMap[variant][state].button;
  const textStyle = bgMap[variant][state].text;

  return (
    <button
      type={type}
      className={cn(
        "flex w-[96px] cursor-pointer items-center justify-center rounded-[8px] py-[12px] transition-colors duration-300",
        variantStyle,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <p className={cn("truncate text-body2-semibold", textStyle)}>{label}</p>
    </button>
  );
}
