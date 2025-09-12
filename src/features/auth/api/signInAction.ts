"use server";

import { signIn } from "@/auth";

export async function signInAction(providerId: string) {
  await signIn(providerId, { redirectTo: "/auth-callback" });
}
