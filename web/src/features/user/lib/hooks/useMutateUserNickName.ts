import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userApi } from "@/entities/user/api/userApi";
import { queryKeys } from "@/shared/api";
import type { ApiResponse } from "@/shared/model";

interface User {
  userId: string;
  nickname: string;
  profileImageUrl: string;
  level: number;
}

interface UseMutateUserNicknameProps {
  onSuccess: (data: ApiResponse<User>) => void;
  onError: (error: Error) => void;
}

export function useMutateUserNickname({ onSuccess, onError }: UseMutateUserNicknameProps) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (nickname: string) => userApi.modifyUserNickname(nickname),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.USER_NICKNAME() });
      queryClient.invalidateQueries({ queryKey: queryKeys.USER_PROFILE() });
      onSuccess?.(data);
    },
    onError: (error) => {
      console.error("닉네임 수정 실패:", error);
      onError?.(error);
    },
  });
}
