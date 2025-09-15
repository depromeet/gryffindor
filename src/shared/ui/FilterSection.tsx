"use client";

import { Checkbox, FilterButton } from "@/shared/ui";

interface FilterSectionProps {
  label?: string;
  showCheckbox?: boolean;
  checked?: boolean;
  onCheckChange?: (checked: boolean) => void;
  options?: string[];
  selectedItems: string[];
  onChange: (items: string[]) => void;
  multiple?: boolean;
}

export function FilterSection({
  label,
  showCheckbox = false,
  checked = false,
  onCheckChange,
  options,
  selectedItems,
  onChange,
  multiple = true,
}: FilterSectionProps) {
  const handleFilterClick = (item: string) => {
    onChange(
      multiple
        ? selectedItems.includes(item)
          ? selectedItems.filter((i) => i !== item)
          : [...selectedItems, item]
        : [item],
    );
  };

  const handleCheckAll = (checked: boolean) => {
    if (checked) {
      onChange(options || []);
    } else {
      onChange([]);
    }
    onCheckChange?.(checked);
  };

  return (
    <article className="flex flex-col gap-4 p-5">
      <section className="flex items-center justify-between gap-4">
        <span className="text-subtitle1">{label || "옵션"}</span>
        {showCheckbox && <Checkbox label="전체 선택" checked={checked} onChange={handleCheckAll} />}
      </section>
      <section className="flex flex-wrap gap-3">
        {options?.map((option) => (
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
