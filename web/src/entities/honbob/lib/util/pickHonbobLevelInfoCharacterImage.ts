import type { StaticImageData } from "next/image";
import { Lv1LevelImage, Lv2LevelImage, Lv3LevelImage, Lv4LevelImage } from "@/shared/lib/assets";

export const pickHonbobLevelInfoCharacterImage = (honbobLevel: string): StaticImageData => {
  switch (honbobLevel) {
    case "Lv.1":
      return Lv1LevelImage;
    case "Lv.2":
      return Lv2LevelImage;
    case "Lv.3":
      return Lv3LevelImage;
    case "Lv.4":
      return Lv4LevelImage;
    default:
      return Lv1LevelImage;
  }
};
