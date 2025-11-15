import type { IconName } from "@/shared/ui";

export const MY_PAGE_NAVIGATION: {
  label: string;
  icon: IconName;
  href: string;
}[] = [
  {
    label: "내 방문 후기 보기",
    icon: "colorNote",
    href: "/reviews",
  },
  {
    label: "레벨 테스트 하기",
    icon: "colorTest",
    href: "/level-test",
  },
  {
    label: "문의하러 가기",
    icon: "colorSpeaker",
    href: "https://forms.gle/5FnfNnyP7Rx41o64A",
  },
];
