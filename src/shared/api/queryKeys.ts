export const queryKeys = {
  USER_PROFILE: () => ["user", "profile"],
  STORE_DETAIL: (storeId: string) => ["store", storeId],
} as const;
