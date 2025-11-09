import {
  Lv1LevelCharacterImage,
  Lv2LevelCharacterImage,
  Lv3LevelCharacterImage,
  Lv4LevelCharacterImage,
} from "@/shared/lib/assets";

export const pickHonbobLevelCharacterImage = (level: number) => {
  switch (level) {
    case 1:
      return Lv1LevelCharacterImage;
    case 2:
      return Lv2LevelCharacterImage;
    case 3:
      return Lv3LevelCharacterImage;
    case 4:
      return Lv4LevelCharacterImage;
    default:
      return Lv1LevelCharacterImage;
  }
};
