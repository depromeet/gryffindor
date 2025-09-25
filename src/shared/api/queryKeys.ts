export const queryKeys = {
  USER_PROFILE: () => ["user", "profile"],
  USER_NICKNAME: () => ["user", "nickname"],
  STORE_LIST: (station: string, level: number) => ["store", "list", station, level],
} as const;
