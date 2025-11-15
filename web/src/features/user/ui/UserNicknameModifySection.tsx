import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useUserState } from "@/entities/user";
import { useMutateUserNickname } from "@/features/user/lib";
import { useNicknameInput } from "@/shared/lib";
import { CTA, Input } from "@/shared/ui";

export function UserNicknameModifySection() {
  const router = useRouter();
  const { userState } = useUserState();
  const { update } = useSession();

  const nickname = useNicknameInput(userState.displayName);

  const { mutate: updateNickname, isPending } = useMutateUserNickname({
    onSuccess: async () => {
      await update({
        nickName: nickname.value,
      });

      router.push("/mypage");
    },
    onError: () => {
      alert("닉네임 수정에 실패했습니다. 다시 시도해주세요.");
    },
  });

  const handleSubmit = async () => {
    if (!nickname.value.trim()) return;
    updateNickname(nickname.value);
  };

  return (
    <div className="flex h-full flex-col gap-y-[8px] p-[20px]">
      <Input {...nickname.inputProps} />

      <div className="fixed right-0 bottom-0 left-0 z-50 mx-auto">
        <CTA
          primaryLabel={isPending ? "변경 중..." : "변경 완료"}
          onPrimary={handleSubmit}
          primaryDisabled={
            !nickname.value.trim() || !nickname.isValid || !nickname.hasChanged || isPending
          }
        />
      </div>
    </div>
  );
}
