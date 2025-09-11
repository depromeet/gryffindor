/**
 * 필터 칩 컴포넌트
 *
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.label - 필터 칩의 레이블
 * @param {string} props.selectedChip - 현재 선택된 필터 칩
 * @param {(label: string) => void} props.setSelectedChip - 필터 칩 선택 시 호출될 상태 변경 함수
 *
 * @example
 * const [selectedChip, setSelectedChip] = useState('');
 * const chips = ['1단계', '2단계', '3단계'];
 * return (
 *   <>
 *     {chips.map(chip => (
 *       <FilterChip
 *         key={chip}
 *         label={chip}
 *         selectedChip={selectedChip}
 *         setSelectedChip={setSelectedChip}
 *       />
 *     ))}
 *   </>
 * );
 */

interface FilterChipProps {
  label: string;
  selectedChip: string;
  setSelectedChip: (label: string) => void;
}

export function FilterChip({ label, selectedChip, setSelectedChip }: FilterChipProps) {
  const isSelected = selectedChip === label;
  return (
    <button
      type="button"
      className={`flex justify-center items-center px-3 py-1.5 rounded-full transition-colors duration-300 cursor-pointer ${
        isSelected ? "bg-primary400" : "bg-gray0"
      }`}
      onClick={() => setSelectedChip(label)}
    >
      <p
        className={`transition-colors duration-300 ${
          isSelected ? "text-gray0 text-body2-semibold" : "text-gray700 text-body2-medium"
        }`}
      >
        {label}
      </p>
    </button>
  );
}
