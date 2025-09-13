import { Icon } from "./Icon";

interface TextButtonProps {
  label: string;
  color?: boolean;
  rotateNumber?: 0 | 90 | 180 | 270;
  isIcon?: boolean;
  isUnderline?: boolean;
  onClick: () => void;
}

export function TextButton({
  label,
  color = false,
  rotateNumber,
  isIcon = true,
  isUnderline,
  onClick,
}: TextButtonProps) {
  const colorStyle = color ? "text-primary400" : "text-gray600";
  return (
    <article className="flex justify-start items-center gap-0.5 cursor-pointer">
      <button type="button" className="justify-start" onClick={onClick}>
        <p
          className={`text-body2-medium ${colorStyle} ${
            isUnderline ? "underline underline-offset-2" : ""
          }`}
        >
          {label}
        </p>
      </button>
      {isIcon && (
        <div className="w-4 h-4">
          <Icon
            name="arrow"
            title="화살표"
            size={16}
            className={`rotate-${rotateNumber} ${colorStyle}`}
          />
        </div>
      )}
    </article>
  );
}
