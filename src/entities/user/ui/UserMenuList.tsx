import Link from "next/link";
import { MY_PAGE_NAVIGATION, UserMenuCard } from "@/entities/user";
import { useUserState } from "../lib/hooks/useUserState";
export function UserMenuList() {
  const { userState } = useUserState();

  return (
    <ul className="mx-[24px] flex flex-col gap-y-[16px]">
      {MY_PAGE_NAVIGATION.map((item) => (
        <li key={item.label}>
          {userState.isLoggedIn && (
            <Link href={`#`}>
              <UserMenuCard icon={item.icon} label={item.label} />
            </Link>
          )}
          {!userState.isLoggedIn && <UserMenuCard icon={item.icon} label={item.label} />}
        </li>
      ))}
    </ul>
  );
}
