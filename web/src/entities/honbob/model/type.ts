import type { StaticImageData } from "next/image";

export interface HonbobLevelCardInfo {
  honbobLevel: string;
  honbobLevelTitle: string;
  honbobLevelDescription: string;
  honbobLevelIcon: StaticImageData;
  recommendedMenu: string;
  recommendedStore: string;
  characteristics: string;
}
