import type { StaticImageData } from "next/image";
import {
  Lv1Character,
  Lv1LevelCharacterImage,
  Lv1LevelImage,
  Lv2Character,
  Lv2LevelCharacterImage,
  Lv2LevelImage,
  Lv3Character,
  Lv3LevelCharacterImage,
  Lv3LevelImage,
  Lv4Character,
  Lv4LevelCharacterImage,
  Lv4LevelImage,
} from "@/shared/lib/assets";

type HonbobLevel = 1 | 2 | 3 | 4;
type ImageMap = Record<HonbobLevel, StaticImageData>;
type HonbobImageType = "profile" | "homeCharacter" | "infoCharacter";

export interface HonbobImageSet {
  readonly profileImage: StaticImageData;
  readonly homeCharacterImage: StaticImageData;
  readonly infoCharacterImage: StaticImageData;
}

const HONBOB_IMAGE_TYPE = {
  PROFILE: "profile",
  HOME_CHARACTER: "homeCharacter",
  INFO_CHARACTER: "infoCharacter",
} as const satisfies Record<string, HonbobImageType>;

// note: 혼밥 레벨에 따른 이미지가 추가/수정될 경우 아래 맵을 수정해야 합니다.
const HONBOB_LEVEL_IMAGES: Record<HonbobImageType, ImageMap> = {
  [HONBOB_IMAGE_TYPE.PROFILE]: {
    1: Lv1Character,
    2: Lv2Character,
    3: Lv3Character,
    4: Lv4Character,
  },
  [HONBOB_IMAGE_TYPE.HOME_CHARACTER]: {
    1: Lv1LevelCharacterImage,
    2: Lv2LevelCharacterImage,
    3: Lv3LevelCharacterImage,
    4: Lv4LevelCharacterImage,
  },
  [HONBOB_IMAGE_TYPE.INFO_CHARACTER]: {
    1: Lv1LevelImage,
    2: Lv2LevelImage,
    3: Lv3LevelImage,
    4: Lv4LevelImage,
  },
} as const;

/**
 * 혼밥 레벨에 따른 이미지를 가져오는 함수
 *
 * @param level - 레벨 (number: 1-4 또는 string: "Lv.1"-"Lv.4")
 * @returns 모든 이미지 타입을 포함한 객체
 *
 * @example
 * ```tsx
 * // 하나만 필요할 때
 * const { homeCharacterImage } = getHonbobLevelImageSet(honbobLevel);
 * <Image src={homeCharacterImage} />
 *
 * // 여러 개 필요할 때
 * const { profileImage, homeCharacterImage } = getHonbobLevelImageSet(honbobLevel);
 * <Image src={profileImage} />
 * <Image src={homeCharacterImage} />
 *
 * // 이름 변경도 가능
 * const { profileImage: levelProfileImage } = getHonbobLevelImageSet(honbobLevel);
 * ```
 */
export const getHonbobLevelImageSet = (level: number | string): HonbobImageSet => {
  const normalizedLevel = normalizeLevel(level);

  return {
    profileImage: HONBOB_LEVEL_IMAGES[HONBOB_IMAGE_TYPE.PROFILE][normalizedLevel],
    homeCharacterImage: HONBOB_LEVEL_IMAGES[HONBOB_IMAGE_TYPE.HOME_CHARACTER][normalizedLevel],
    infoCharacterImage: HONBOB_LEVEL_IMAGES[HONBOB_IMAGE_TYPE.INFO_CHARACTER][normalizedLevel],
  } as const satisfies HonbobImageSet;
};

// 헬퍼 함수들

/**
 * 레벨을 정규화하여 1-4 범위의 HonbobLevel로 변환
 */
const normalizeLevel = (level: number | string): HonbobLevel => {
  if (typeof level === "number") {
    return clampLevel(level);
  }

  const lvMatch = level.match(/^Lv\.?(\d+)$/i);
  if (lvMatch) {
    return clampLevel(parseInt(lvMatch[1], 10));
  }

  const numericLevel = parseInt(level, 10);
  return clampLevel(Number.isNaN(numericLevel) ? 1 : numericLevel);
};

/**
 * 레벨을 1-4 범위로 제한
 */
const DEFAULT_HONBOB_LEVEL = 1;

const clampLevel = (level: number): HonbobLevel => {
  if (level < 1 || level > 4) {
    return DEFAULT_HONBOB_LEVEL;
  }
  return level as HonbobLevel;
};
