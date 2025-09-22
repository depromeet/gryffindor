import { Icon, TextButton } from "@/shared/ui";

export function SuggestionCard() {
  return (
    <article className="mt-[78px] flex w-full items-center justify-between gap-2 rounded-[12px] bg-gray50 px-5 py-4">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-[2px]">
          <span className="text-body1-semibold text-gray800">정보 수정 제안</span>
          <span className="text-body2-regular text-gray600">
            알고 계신 정보와 다른 정보가 있나요?
          </span>
        </div>
        <TextButton label="정보 수정 제안하기" color isIcon rotateNumber={270} onClick={() => {}} />
      </div>

      <Icon name="character" size={74} disableCurrentColor />
    </article>
  );
}
