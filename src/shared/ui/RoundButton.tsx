/**
 * 원형 버튼 컴포넌트
 *
 * @param {Object} props - 컴포넌트 props
 * @param {boolean} [props.isIconShow=false] - 아이콘 표시 여부
 * @param {string} props.label - 버튼의 레이블
 * @param {() => void} props.onClick - 클릭 이벤트 핸들러
 *
 * @example
 * <RoundButton icon={<YourIcon />} onClick={() => console.log("clicked")} />
 */

import { Icon } from "./Icon";

interface RoundButtonProps {
  isIconShow?: boolean;
  label?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

export function RoundButton({
  isIconShow = false,
  label,
  type = "button",
  onClick,
}: RoundButtonProps) {
  const paddingStyle = isIconShow ? "pl-2 pr-3" : "px-3";
  return (
    <button
      type={type}
      className={`flex items-center justify-center ${paddingStyle} py-1.5 rounded-full gap-[2px] bg-gray800`}
      onClick={onClick}
    >
      {isIconShow && <Icon name="speaker" title="버튼" size={20} />}
      <p className="text-body2-semibold truncate text-gray0">{label}</p>
    </button>
  );
}
