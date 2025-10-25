"use client";

import { useContext } from "react";
import { UserStateContext } from "@/entities/user/model/context";

export function useUserState() {
  const context = useContext(UserStateContext);

  if (!context) {
    throw new Error("useUserState must be used within a UserStateProvider");
  }

  return context;
}
