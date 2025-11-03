"use client";

import Image from "next/image";
import EditCharacter from "@/shared/lib/assets/png/character/edit.png";

export function SuggestionImage() {
  return (
    <div className="flex flex-col gap-3 items-center">
      <div className="mt-[10px] relative h-[74px] w-[74px] flex-shrink-0">
        <Image src={EditCharacter} alt="character" fill sizes="74px" className="rounded-[40px]" />
      </div>
      <div className="flex flex-col gap-y-[8px]">
        <p className="text-body1-semibold text-gray900 whitespace-pre-line text-center">
          {`알고 계신 정보와 다른 정보가 있나요?\n제보해주시면 저희가 확인 후 빠르게 수정할게요!`}
        </p>
      </div>
    </div>
  );
}
