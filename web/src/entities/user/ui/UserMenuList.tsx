"use client";

import { useState } from "react";
import { MY_PAGE_NAVIGATION, UserMenuCard } from "@/entities/user";
import { LoginRequiredModal } from "@/features/report/ui/LoginRequiredModal";
import { useUserState } from "../lib/hooks/useUserState";

export function UserMenuList() {
  const { userState } = useUserState();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");

  const handleLoginRequiredClick = (menuLabel: string) => {
    setModalText(menuLabel);
    setIsLoginModalOpen(true);
  };

  return (
    <>
      <ul className="mx-[24px] flex flex-col gap-y-[16px]">
        {MY_PAGE_NAVIGATION.map((item) => (
          <li key={item.label}>
            {userState.isLoggedIn ? (
              <a href={item.href as any} target={item.isExternal ? "_blank" : "_self"}>
                <UserMenuCard icon={item.icon} label={item.label} />
              </a>
            ) : item.isExternal ? (
              <a href={item.href as any} target="_blank" rel="noopener noreferrer">
                <UserMenuCard icon={item.icon} label={item.label} />
              </a>
            ) : (
              <button
                type="button"
                className="w-full"
                onClick={() => handleLoginRequiredClick(item.label)}
              >
                <UserMenuCard icon={item.icon} label={item.label} />
              </button>
            )}
          </li>
        ))}
      </ul>
      <LoginRequiredModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        setIsLoginModalOpen={setIsLoginModalOpen}
        text={modalText}
      />
    </>
  );
}
