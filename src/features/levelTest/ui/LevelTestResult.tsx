"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Lv1Character, Lv2Character, Lv3Character, Lv4Character } from "@/shared/lib/assets";
import { Button, Tag } from "@/shared/ui";
import type { LevelTestResponse } from "../model/levelTestStore";

const LEVEL_DESCRIPTIONS = {
  1: {
    title: "혼밥 입문자",
    subtitle: "아직 혼밥이 낯설군요. 시작은 가볍게!",
    description:
      "패스트푸드처럼 눈치 안 보고 후딱 먹을 수 있는 곳을 찾아다녀요. 다른 시선이 조금 신경쓰이는, 혼밥 세계로 발을 들인 풋풋한 초보자예요.",
    recommendations: "편의점 도시락, 샌드위치, 김밥, 패스트푸드",
    image: Lv1Character,
  },
  2: {
    title: "혼밥 탐험가",
    subtitle: "혼밥 전용석에서 맛있는 한 끼 해볼까요?",
    description:
      '1인석이나 바 좌석을 찾아서 앉는 게 편안해요. 국밥 같은 혼밥 메뉴를 즐기며 "혼자 먹는 거 괜찮네?" 라는 자신감을 키우는 단계예요.',
    recommendations: "국밥, 라면, 돈까스, 카레, 초밥/카페/디저트",
    image: Lv2Character,
  },
  3: {
    title: "혼밥 숙련자",
    subtitle: "이제는 4인석도 두렵지 않아",
    description:
      '4인 테이블에 앉아도 당당하게 메뉴를 주문해요. 가끔 "혼자세요?"라는 질문을 받아도 웃으며 넘어갈 수 있는 혼밥 중급자예요.',
    recommendations: "백반 정식, 파스타, 김치찌개/된장찌개",
    image: Lv3Character,
  },
  4: {
    title: "혼밥 마스터",
    subtitle: "최소 주문 단위가 2인분? 문제없지",
    description:
      "2인분 이상 주문 조건에도 굴하지 않아요. 닭갈비, 고깃집도 혼자서 정복하고, 필요하면 포장까지 완벽하게 챙기는 혼밥 고수예요.",
    recommendations: "닭갈비, 찜닭, 부대찌개, 고깃집",
    image: Lv4Character,
  },
};

interface LevelTestResultProps {
  result: LevelTestResponse;
}

export function LevelTestResult({ result }: LevelTestResultProps) {
  const levelInfo =
    LEVEL_DESCRIPTIONS[result.level as keyof typeof LEVEL_DESCRIPTIONS] || LEVEL_DESCRIPTIONS[1];
  const router = useRouter();

  const handeResultClick = () => {
    router.push("/home");
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center rounded-[24px] bg-gray0 px-[20px] pt-[32px] pb-[40px] shadow-sm">
        <Tag label={`레벨 ${result.level}`} color="red" size="small" iconName="crown" />
        <span className="mt-[7px] mb-[20px] text-title1">{levelInfo.title}</span>
        <div className="flex flex-col items-center">
          <Image
            className="mb-[20px] rounded-full"
            src={levelInfo.image}
            alt="level-test-result"
            width={120}
            height={120}
          />
          <p className="text-body3-semibold text-primary400">{levelInfo.subtitle}</p>
          <span className="mt-[28px] mb-[8px] text-body2-semibold text-gray600">레벨 특징</span>
          <p className="text-body1-regular text-gray900">{levelInfo.description}</p>
          <div className="my-[28px] h-[1px] w-full bg-gray100" />
          <span className="mb-[8px] text-body2-semibold text-gray600">추천 메뉴</span>
          <p className="text-body1-regular text-gray900">{levelInfo.recommendations}</p>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-gray0 p-[20px]">
        <Button label="혼밥 식당 보러가기" variant="primary" fullWidth onClick={handeResultClick} />
      </div>
    </div>
  );
}
