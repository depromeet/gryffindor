"use client";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { PriceInput } from "@/shared/ui";

interface PriceRangeProps {
  label?: string;
  values: [number, number];
  onChange: (values: [number, number]) => void;
}

export function PriceRange({ label, values, onChange }: PriceRangeProps) {
  const min = 0;
  const max = 20000;

  const handleInputChange = (type: "min" | "max", num: number) => {
    const newValues: [number, number] = [...values];
    if (type === "min") newValues[0] = Math.max(min, num);
    if (type === "max") newValues[1] = Math.min(max, num);

    if (newValues[0] <= newValues[1]) {
      onChange(newValues);
    }
  };

  return (
    <article className="flex flex-col gap-4 py-5">
      <section className="flex flex-col items-start justify-center gap-1 px-5">
        <div className="flex w-full items-center justify-between">
          <span className="flex-[1_0_0] text-subtitle1">{label || "가격 범위"}</span>
        </div>
        <div>
          <span className="text-[#4C4C4C] text-caption2-medium">한 메뉴 기준</span>
        </div>
      </section>
      <section className="flex flex-col gap-4 px-5">
        <div className="relative px-2.5">
          <Slider
            allowCross={true}
            range
            min={min}
            max={max}
            step={500}
            value={values}
            onChange={(v) => Array.isArray(v) && onChange(v as [number, number])}
            styles={{
              track: { backgroundColor: "#fb4f2b", height: 4 },
              rail: { backgroundColor: "#e7e7e7", height: 4 },
              handle: {
                backgroundColor: "white",
                borderColor: "#d2d2d2",
                borderWidth: 2,
                width: 24,
                height: 24,
                marginTop: -10,
                opacity: 1,
                boxShadow: "none",
              },
            }}
          />
          <div className="mt-2 flex w-full items-center justify-between">
            <span className="text-[#000] text-body3-regular">{min.toLocaleString()}원</span>
            <span className="text-[#000] text-body3-regular">{max.toLocaleString()}원 이상</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <PriceInput value={values[0]} onChange={(val) => handleInputChange("min", val)} />
          <div className="h-[1px] flex-1 bg-[#ddd]" />
          <PriceInput value={values[1]} onChange={(val) => handleInputChange("max", val)} />
        </div>
      </section>
    </article>
  );
}
