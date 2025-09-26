export const queryKeys = {
  USER_PROFILE: () => ["user", "profile"],
  STORE_DETAIL: (storeId: string) => ["store", storeId],
  USER_NICKNAME: () => ["user", "nickname"],
} as const;
