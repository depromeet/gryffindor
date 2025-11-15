/**
 * FilterSection 컴포넌트
 *
 * @param {string} label - 섹션의 라벨
 * @param {boolean} showCheckbox - '전체 선택' 체크박스 표시 여부
 * @param {boolean} checked - '전체 선택' 체크박스 상태
 * @param {function} onCheckChange - '전체 선택' 체크박스 상태 변경
 * @param {Array<string>} options - 필터링할 옵션 목록
 * @param {Array<string>} selectedItems - 선택된 필터 옵션 목록
 * @param {function} onChange - 필터 옵션 변경 핸들러
 * @param {boolean} isMultiple - 다중 선택 가능 여부
 */

"use client";

import { Checkbox, FilterButton } from "@/shared/ui";

interface FilterSectionProps {
  label?: string;
  showCheckbox?: boolean;
  checked?: boolean;
  onCheckChange?: (checked: boolean) => void;
  options: string[];
  selectedItems: string[];
  onChange: (items: string[]) => void;
  isMultiple?: boolean;
}

export function FilterSection({
  label,
  showCheckbox = false,
  checked = false,
  onCheckChange,
  options,
  selectedItems,
  onChange,
  isMultiple = true,
}: FilterSectionProps) {
  const handleFilterClick = (item: string) => {
    if (isMultiple) {
      onChange(
        selectedItems.includes(item)
          ? selectedItems.filter((i) => i !== item)
          : [...selectedItems, item],
      );
    } else {
      onChange([item]);
    }
  };

  const handleCheckAll = (checked: boolean) => {
    if (checked) {
      onChange(options);
    } else {
      onChange([]);
    }
    onCheckChange?.(checked);
  };

  return (
    <article className="flex flex-col gap-4 p-5">
      <section className="flex items-center justify-between gap-4">
        <span className="text-subtitle1">{label}</span>
        {showCheckbox && <Checkbox label="전체 선택" checked={checked} onChange={handleCheckAll} />}
      </section>
      <section className="grid grid-cols-3 gap-3">
        {options.map((option) => (
          <FilterButton
            key={option}
            label={option}
            variant="outline"
            selected={selectedItems.includes(option)}
            onClick={() => handleFilterClick(option)}
          />
        ))}
      </section>
    </article>
  );
}
