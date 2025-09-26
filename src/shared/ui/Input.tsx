"use client";

import { useId, useState } from "react";
import type { ValidationRule } from "@/shared/config/inputConfig";
import { getValidationErrorMessage } from "@/shared/lib/utils/inputValidation";
import { Icon } from "@/shared/ui";

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  validation?: ValidationRule;
  disabled?: boolean;
  className?: string;
  resetButton?: boolean;
}

export function Input({
  value,
  onChange,
  placeholder,
  label,
  validation,
  disabled = false,
  className = "",
  resetButton = false,
}: InputProps) {
  const inputId = useId();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);

    setErrorMessage(getValidationErrorMessage(newValue, validation));
  };

  const handleReset = () => {
    onChange("");
  };

  return (
    <div className={`flex flex-col gap-y-[8px] ${className}`}>
      {label && (
        <label htmlFor={inputId} className="text-body2-regular text-gray700">
          {label}
          {validation?.required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      <div
        className={`flex items-center rounded-[10px] border border-gray100 bg-white p-[16px] transition-colors ${disabled ? "cursor-not-allowed bg-gray100" : ""}`}
      >
        <input
          id={inputId}
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={validation?.maxLength}
          className="w-full bg-transparent text-body2-regular text-gray900 outline-none placeholder:text-gray900 disabled:cursor-not-allowed"
        />
        {resetButton && value && (
          <button type="reset" onClick={handleReset}>
            <Icon name="closeCircle" size={18} disableCurrentColor />
          </button>
        )}
      </div>
      {errorMessage && <span className="text-body3-regular text-error">{errorMessage}</span>}
    </div>
  );
}
