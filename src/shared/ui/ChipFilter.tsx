/**
 * 칩 필터 컴포넌트
 *
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.label - 필터의 레이블
 * @param {boolean} props.selected - 선택 상태 여부
 * @param {() => void} props.onClick - 클릭 이벤트 핸들러
 *
 * @example
 * <ChipFilter label="전체" selected onClick={() => console.log("clicked")} />
 */
interface ChipFilterProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

export function ChipFilter({ label, selected = false, onClick }: ChipFilterProps) {
  const styles = {
    selected: {
      button: "bg-primary400",
      text: "text-gray0",
    },
    unselected: {
      button: "bg-gray0",
      text: "text-gray700",
    },
  } as const;

  const state = selected ? "selected" : "unselected";

  return (
    <button
      type="button"
      className={`flex items-center justify-center px-[12px] py-[6px] rounded-full cursor-pointer transition-colors duration-300 ${styles[state].button}`}
      onClick={onClick}
    >
      <p className={`text-body2-medium truncate ${styles[state].text}`}>{label}</p>
    </button>
  );
}
