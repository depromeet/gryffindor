import type { IconName } from "@/shared/ui";

export const MY_PAGE_NAVIGATION: { label: string; icon: IconName; href: string }[] = [
  {
    label: "식당 제보하기",
    icon: "colorSpeaker",
    href: "/report",
  },
  {
    label: "내 방문 후기 보기",
    icon: "colorNote",
    href: "/mypage/reviews",
  },
  {
    label: "레벨 테스트 하기",
    icon: "colorTest",
    href: "/level-test",
  },
];
