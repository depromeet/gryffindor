/**
 * Input validation 설정 타입
 */
interface ValidationRule {
  required?: boolean;
  pattern?: RegExp;
  maxLength?: number;
  minLength?: number;
  message?: string; // 커스텀 메시지
}

/**
 * Input 필드별 설정
 */
interface InputFieldConfig {
  label: string;
  placeholder?: string;
  validation?: ValidationRule;
  type?: "text" | "email" | "tel" | "password" | "number";
  resetButton?: boolean;
}

/**
 * 사용되는 패턴들
 */
export const VALIDATION_PATTERNS = {
  NICKNAME: /^[가-힣a-zA-Z0-9]{2,8}$/,
} as const;

/**
 * 미리 정의된 validation 규칙들
 */
export const VALIDATION_RULES = {
  // 기본 required (메시지 없음 - 기본 메시지 사용)
  REQUIRED: { required: true },

  // 커스텀 메시지가 있는 required 규칙들
  REQUIRED_WITH_MESSAGE: {
    NICKNAME: { required: true, message: "닉네임을 입력해주세요." },
    ADDRESS: { required: true, message: "가게 위치를 입력해주세요." },
    STORE_NAME: { required: true, message: "가게 이름을 입력해주세요." },
    RECOMMEND_MENU: { required: true, message: "추천 메뉴를 입력해주세요." },
    RECOMMEND_REASON: { required: true, message: "추천 이유를 입력해주세요." },
  },

  // 패턴 검증 규칙들
  PATTERNS: {
    NICKNAME: {
      pattern: VALIDATION_PATTERNS.NICKNAME,
      message: "2-8글자의 한글, 영문, 숫자만 사용 가능합니다.",
    },
  },

  // 길이 검증 규칙들
  LENGTH: {
    NICKNAME: { minLength: 2, maxLength: 8 },
    RECOMMEND_REASON: { minLength: 0, maxLength: 10 },
    REVIEW: { minLength: 0, maxLength: 10 },
  },
} as const;

/**
 * 페이지별 Input 설정
 */
export const INPUT_CONFIG: Record<string, Record<string, InputFieldConfig>> = {
  // 닉네임 변경 페이지
  nickname: {
    nickname: {
      label: "닉네임",
      placeholder: "닉네임을 입력하세요.",
      validation: {
        ...VALIDATION_RULES.REQUIRED_WITH_MESSAGE.NICKNAME,
        ...VALIDATION_RULES.PATTERNS.NICKNAME,
        ...VALIDATION_RULES.LENGTH.NICKNAME,
      },
      resetButton: true,
    },
  },

  // 리뷰 작성 페이지
  review: {
    review: {
      label: "리뷰",
      placeholder: "리뷰를 입력하세요.",
      validation: {
        ...VALIDATION_RULES.LENGTH.REVIEW,
      },
    },
  },
};

/**
 * Input 설정 조회 함수
 */
export function getInputConfig(page: string, field: string): InputFieldConfig | null {
  return INPUT_CONFIG[page]?.[field] || null;
}

/**
 * 페이지의 모든 필드 설정 조회
 */
export function getPageInputConfig(page: string): Record<string, InputFieldConfig> | null {
  return INPUT_CONFIG[page] || null;
}

// 타입 export
export type { ValidationRule, InputFieldConfig };
