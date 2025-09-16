import { axiosInstance } from "@/shared/config";

interface User {
  userId: string;
  nickname: string;
  profileImageUrl: string;
  level: number;
}

export const userApi = {
  modifyUserNickname: async (nickname: string) =>
    await axiosInstance.patch<User>(`/api/v1/users/me`, { nickname }),

  getUserProfile: async () => await axiosInstance.get<User>(`/api/v1/users/me`),
};
