"use client";

import { createContext } from "react";
import type { UserState } from "@/shared/model";

export interface UserStateContextValue {
  userState: UserState;
  isLoading: boolean;
}

export const UserStateContext = createContext<UserStateContextValue | null>(null);
