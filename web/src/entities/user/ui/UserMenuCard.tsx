import { Icon, type IconName } from "@/shared/ui";

interface UserMenuCardProps {
  icon: IconName;
  label: string;
}

export function UserMenuCard({ icon, label }: UserMenuCardProps) {
  return (
    <div className="flex items-center gap-x-[4px] rounded-[13px] bg-gray50 p-[12px]">
      <Icon name={icon} size={32} disableCurrentColor />
      <span className="text-body2-medium text-gray900">{label}</span>
    </div>
  );
}
