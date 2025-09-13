/**
 * 체크박스 컴포넌트
 *
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.label - 체크박스의 레이블
 * @param {boolean} props.checked - 체크 상태 여부
 * @param {(checked: boolean) => void} props.onChange - 체크 상태 변경 이벤트 핸들러
 *
 * @example
 * <Checkbox label="동의합니다" checked={checked} onChange={setChecked} />
 */

import { cn } from "@/shared/lib";
import { Icon } from "./Icon";

interface CheckboxProps {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export function Checkbox({ label, checked, onChange }: CheckboxProps) {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.checked);
  };

  return (
    <label className="flex cursor-pointer items-center gap-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
        className="absolute h-0 w-0 opacity-0"
      />
      <div
        className={cn(
          "flex h-5 w-5 items-center justify-center rounded-[4px] transition-colors duration-300",
          checked ? "bg-primary400" : "bg-gray200",
        )}
      >
        <Icon name="check" size={16} />
      </div>
      <p className="truncate text-body2-regular text-gray700">{label}</p>
    </label>
  );
}
