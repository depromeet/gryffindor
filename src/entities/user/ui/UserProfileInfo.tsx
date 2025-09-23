import { Tag } from "@/shared/ui";

export function UserProfileInfo() {
  const userLevel = 2;
  const userName = "이름이야이름이야";

  return (
    <div className="flex items-center gap-x-[8px]">
      <div className="h-[72px] w-[72px] bg-gray-200">아이콘</div>
      <div className="flex flex-col gap-y-[8px]">
        <Tag color="red" size="small" label={`레벨${userLevel}`} />
        <span className="text-gray900 text-title2">{userName}</span>
      </div>
    </div>
  );
}
