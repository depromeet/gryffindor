import Link from "next/link";
import { MY_PAGE_NAVIGATION, UserMenuCard } from "@/entities/user";

export function UserMenuList() {
  return (
    <ul className="mx-[24px] flex flex-col gap-y-[16px]">
      {MY_PAGE_NAVIGATION.map((item) => (
        <li key={item.label}>
          <Link href={`#`}>
            <UserMenuCard icon={item.icon} label={item.label} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
