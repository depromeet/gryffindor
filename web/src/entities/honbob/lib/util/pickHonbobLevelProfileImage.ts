import { Lv1Character, Lv2Character, Lv3Character, Lv4Character } from "@/shared/lib/assets";

export const pickHonbobLevelProfileImage = (level: number) => {
  switch (level) {
    case 1:
      return Lv1Character;
    case 2:
      return Lv2Character;
    case 3:
      return Lv3Character;
    case 4:
      return Lv4Character;
    default:
      return Lv1Character;
  }
};
