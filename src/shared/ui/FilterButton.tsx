/**
 * 필터 버튼 컴포넌트
 *
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.label - 버튼의 레이블
 * @param {boolean} props.selected - 선택 여부
 * @param {() => void} props.onClick - 버튼 클릭 이벤트 핸들러
 * @param {"fill" | "line"} props.variant - 버튼 스타일 (fill 또는 line)
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

interface FilterButtonProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  variant: "fill" | "line";
  disabled?: boolean;
}

export function FilterButton({
  label,
  selected,
  onClick,
  variant,
  disabled = false,
}: FilterButtonProps) {
  const bgMap = {
    fill: {
      primary: "bg-primary400",
      gray: "bg-gray100",
      disabled: "bg-gray50",
    },
    line: {
      primary: "bg-primary100 border border-primary300 border-[1.4px]",
      gray: "bg-gray0 border border-gray100 border-[1px]",
      disabled: "bg-gray0 border border-gray100 border-[1px]",
    },
  } as const;

  const textMap = {
    fill: {
      primary: "text-gray0",
      gray: "text-gray800",
      disabled: "text-gray400",
    },
    line: {
      primary: "text-primary500",
      gray: "text-gray600",
      disabled: "text-gray400",
    },
  } as const;

  const state = disabled ? "disabled" : selected ? "primary" : "gray";

  const variantStyle = bgMap[variant][state];
  const textStyle = textMap[variant][state];

  return (
    <button
      type="button"
      className={`flex w-[96px] items-center justify-center py-[12px] rounded-[8px] transition-colors duration-300 cursor-pointer ${variantStyle}`}
      onClick={onClick}
      disabled={disabled}
    >
      <p className={`text-body2-semibold whitespace-nowrap truncate ${textStyle}`}>{label}</p>
    </button>
  );
}
