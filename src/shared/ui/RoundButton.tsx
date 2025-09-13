/**
 * 원형 버튼 컴포넌트
 *
 * @param {Object} props - 컴포넌트 props
 * @param {IconName} [props.iconName] - 아이콘 이름
 * @param {string} props.label - 버튼의 레이블
 * @param {() => void} props.onClick - 클릭 이벤트 핸들러
 *
 * @example
 * <RoundButton iconName="speaker" label="스피커" onClick={() => console.log("clicked")} />
 */

import { cn } from "@/shared/lib";
import { Icon, type IconName } from "./Icon";

interface RoundButtonProps {
  iconName?: IconName;
  label?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export function RoundButton({ iconName, label, type = "button", onClick }: RoundButtonProps) {
  const paddingStyle = iconName ? "pl-2 pr-3" : "px-3";
  return (
    <button
      type={type}
      className={cn(
        "flex cursor-pointer items-center justify-center gap-[2px] rounded-full bg-gray800 py-1.5",
        paddingStyle,
      )}
      onClick={onClick}
    >
      {iconName && <Icon name={iconName} title="버튼" size={20} className="text-gray0" />}
      <p className="truncate text-body2-semibold text-gray0">{label}</p>
    </button>
  );
}
