"use client";

import { useState } from "react";
import { cn } from "@/shared/lib";
import { Icon } from "./Icon";
import { Select } from "./Select";

interface RoundedSelectBoxProps {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
  contentClassName?: string;
}

export function RoundedSelectBox({
  value,
  onChange,
  options,
  placeholder = "선택",
  contentClassName,
}: RoundedSelectBoxProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleValueChange = (newValue: string) => {
    onChange(newValue);
    setIsOpen(false);
  };

  const currentLabel = options.find((opt) => opt.value === value)?.label || placeholder;

  return (
    <Select
      value={value}
      isOpen={isOpen}
      onValueChange={handleValueChange}
      onOpenChange={setIsOpen}
      closeOnOutsideClick={true}
    >
      <Select.Trigger className="relative flex items-center gap-1 rounded-full border border-gray200 pl-3 pr-2 py-1.5">
        <span className="text-body2-medium text-gray700">{currentLabel}</span>
        <Select.Icon>
          <Icon name="downArrow" color="gray400" size={16} />
        </Select.Icon>
      </Select.Trigger>
      <Select.Content
        className={cn(
          "absolute top-[calc(100%+10px)] right-0 w-[180px] z-100 rounded-[10px] border border-gray100 bg-gray0 shadow-navigation",
          contentClassName,
        )}
      >
        {options.map((option, index) => (
          <Select.Item key={option.value} value={option.value} className="relative px-5 py-3.5">
            <span
              className={`text-body2-semibold ${
                value === option.value ? "text-gray900" : "text-gray400"
              }`}
            >
              {option.label}
            </span>
            {index < options.length - 1 && (
              <div className="absolute bottom-0 w-[140px] h-px border-b border-gray100" />
            )}
          </Select.Item>
        ))}
      </Select.Content>
    </Select>
  );
}
