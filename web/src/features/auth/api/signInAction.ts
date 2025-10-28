"use server";

import { signIn } from "@/auth";
import type { SocialLoginProvider } from "@/features/auth/config/socialLoginConfig";

export async function signInAction(providerId: SocialLoginProvider) {
  await signIn(providerId, { redirectTo: "/auth-callback" });
}
