"use client";

import { useState } from "react";

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  label: string;
  maxLength?: number;
  minLength?: number;
  placeholder?: string;
}

export function InputReview({
  value,
  onChange,
  label,
  maxLength = 120,
  minLength = 5,
  placeholder = "후기를 작성해주세요.",
}: Props) {
  const [isTouched, setIsTouched] = useState(false);

  const handleBlur = () => {
    setIsTouched(true);
  };

  const isError = isTouched && value.length < minLength;

  return (
    <article className="flex w-full flex-col gap-2">
      <span className="text-[#000] text-subtitle1">{label}</span>

      <div className="w-full rounded-[12px] border border-gray-100 bg-gray p-4">
        <textarea
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          maxLength={maxLength}
          className="scrollbar-hide w-full resize-none text-body1 placeholder-gray-400 focus:outline-none"
        />
        <div className="flex items-end justify-end gap-0.5">
          <span className="text-body2-regular text-primary400">{value.length}</span>
          <span className="text-body2-regular text-gray-600">/</span>
          <span className="text-body2-regular text-gray-600">{maxLength}</span>
        </div>
      </div>

      {isError && (
        <span className="text-[#FF2D2D] text-body3-regular">{minLength}글자 이상 작성해주세요</span>
      )}
    </article>
  );
}
