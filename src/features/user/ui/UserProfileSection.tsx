import { useRouter } from "next/navigation";
import { UserProfileInfo } from "@/entities/user";
import { RoundButton } from "@/shared/ui";

export function UserProfileSection() {
  const router = useRouter();

  return (
    <div className="mx-[24px] flex items-center justify-between gap-x-[8px]">
      <UserProfileInfo />
      <RoundButton
        label="닉네임 변경"
        onClick={() => {
          router.push("/mypage/nickname");
        }}
      />
    </div>
  );
}
