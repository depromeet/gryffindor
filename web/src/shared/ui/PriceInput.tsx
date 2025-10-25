interface PriceInputProps {
  value: number;
  onChange: (val: number) => void;
}

export function PriceInput({ value, onChange }: PriceInputProps) {
  const handleChange = (raw: string) => {
    if (raw === "") {
      onChange(0);
      return;
    }

    const parsed = parseInt(raw.replace(/,/g, ""), 10);
    if (!Number.isNaN(parsed)) {
      onChange(parsed);
    }
  };
  return (
    <div className="flex h-[48px] w-[105px] items-center gap-1 rounded-[8px] border border-[#ddd] px-3">
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={value.toLocaleString()}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full bg-transparent text-[#000] text-body2-semibold outline-none"
      />
      <span className="text-[#5d5d5d] text-body2-regular">원</span>
    </div>
  );
}
