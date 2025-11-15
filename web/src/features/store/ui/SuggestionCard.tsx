import Image from "next/image";
import { useRouter } from "next/navigation";
import EditCharacter from "@/shared/lib/assets/png/character/edit.png";
import { TextButton } from "@/shared/ui";

export function SuggestionCard({ storeId }: { storeId: number }) {
  const router = useRouter();
  return (
    <article className="mt-5 px-5 pb-[59px]">
      <div className="flex w-full items-center justify-between gap-2 rounded-[12px] bg-gray50 px-5 py-4">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-[2px]">
            <span className="text-body1-semibold text-gray800">정보 수정 제안</span>
            <span className="text-body2-regular text-gray600">
              알고 계신 정보와 다른 정보가 있나요?
            </span>
          </div>
          <TextButton
            label="정보 수정 제안하기"
            color="primary"
            isIcon
            rotateNumber={270}
            onClick={() => {
              router.push(`/store/${storeId}/suggestion-store`);
            }}
          />
        </div>

        <Image src={EditCharacter} alt="character" width={74} height={74} />
      </div>
    </article>
  );
}
