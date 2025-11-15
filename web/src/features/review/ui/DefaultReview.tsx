import Image from "next/image";

export function DefaultReview({ text }: { text: string }) {
  return (
    <div className="flex flex-col gap-4 items-center px-5">
      <Image
        src={require("@/shared/lib/assets/png/character/sad.png")}
        alt="기본 리뷰 이미지"
        width={80}
        height={80}
      />
      <span className="text-body2-regular text-gray700 text-center whitespace-pre-line">
        {text}
      </span>
    </div>
  );
}
