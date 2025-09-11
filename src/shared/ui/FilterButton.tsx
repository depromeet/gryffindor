/**
 * 필터 버튼(Fill) 컴포넌트
 *
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.label - 버튼의 레이블
 * @param {boolean} props.selected - 선택 여부
 * @param {() => void} props.onClick - 버튼 클릭 이벤트 핸들러
 * @param {boolean} [props.disabled] - 비활성화 여부 (선택적)
 *
 * @example
 * const [selectedFill, setSelectedFill] = useState<string[]>([]);
 * const options = ['1단계', '2단계', '3단계'];
 *
 * return (
 *   <>
 *     {options.map(option => (
 *       <FilterButtonFill
 *         key={option}
 *         label={option}
 *         selected={selectedFill.includes(option)}
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
  disabled?: boolean;
}

export function FilterButtonFill({
  label,
  selected,
  onClick,
  disabled = false,
}: FilterButtonProps) {
  const variantStyle = disabled ? "bg-gray50" : selected ? "bg-primary400" : "bg-gray100";

  const textStyle = disabled ? "text-gray400" : selected ? "text-gray0" : "text-gray800";

  return (
    <button
      type="button"
      className={`flex min-w-[6rem] items-center justify-center py-3 rounded-[8px] transition-colors duration-300 border  cursor-pointer ${variantStyle}`}
      onClick={onClick}
      disabled={disabled}
    >
      <p className={`text-body2-semibold whitespace-nowrap truncate ${textStyle}`}>{label}</p>
    </button>
  );
}
/**
 * 필터 버튼(Line) 컴포넌트
 *
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.label - 버튼의 레이블
 * @param {boolean} props.selected - 선택 여부
 * @param {() => void} props.onClick - 버튼 클릭 이벤트 핸들러
 * @param {boolean} [props.disabled] - 비활성화 여부 (선택적)
 *
 * @example
 * const [selectedLine, setSelectedLine] = useState<string[]>([]);
 * const options = ['1단계', '2단계', '3단계'];
 *
 * return (
 *   <>
 *     {options.map(option => (
 *       <FilterButtonLine
 *         key={option}
 *         label={option}
 *         selected={selectedLine.includes(option)}
 *         onClick={() =>
 *           setSelectedLine(prev =>
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

export function FilterButtonLine({
  label,
  selected,
  onClick,
  disabled = false,
}: FilterButtonProps) {
  const variantStyle = disabled
    ? "bg-gray0 border border-gray100 border-[1px]"
    : selected
      ? "bg-primary100 border border-primary300 border-[1.4px]"
      : "bg-gray0 border border-gray100 border-[1px]";

  const textStyle = disabled ? "text-gray400" : selected ? "text-primary500" : "text-gray600";

  return (
    <button
      type="button"
      className={`flex min-w-[6rem] items-center justify-center py-3 rounded-[8px] transition-colors duration-300 border  cursor-pointer ${variantStyle}`}
      onClick={onClick}
      disabled={disabled}
    >
      <p className={`text-body2-semibold whitespace-nowrap truncate ${textStyle}`}>{label}</p>
    </button>
  );
}
