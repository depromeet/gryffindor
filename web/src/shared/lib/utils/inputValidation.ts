import type { ValidationRule } from "@/shared/config/inputConfig";

/**
 * validation 규칙에 따라 값이 유효한지 검사
 */
export function validateValue(value: string, validation?: ValidationRule): boolean {
  if (!validation) return true;

  // Required 검증
  if (validation.required && !value.trim()) {
    return false;
  }

  // 값이 없으면 다른 검증 건너뛰기 (required가 아닌 경우)
  if (!value) return true;

  // MinLength 검증
  if (validation.minLength && value.length < validation.minLength) {
    return false;
  }

  // MaxLength 검증
  if (validation.maxLength && value.length > validation.maxLength) {
    return false;
  }

  // Pattern 검증
  if (validation.pattern && !validation.pattern.test(value)) {
    return false;
  }

  return true;
}

/**
 * validation 규칙에 따라 에러 메시지 반환
 */
export function getValidationErrorMessage(value: string, validation?: ValidationRule): string {
  if (!validation) return "";

  // Required 검증
  if (validation.required && !value.trim()) {
    return validation.message || "필수 입력 항목입니다.";
  }

  // 값이 없으면 다른 검증 건너뛰기
  if (!value) return "";

  // MinLength 검증
  if (validation.minLength && value.length < validation.minLength) {
    return validation.message || `최소 ${validation.minLength}글자 이상 입력해주세요.`;
  }

  // MaxLength 검증
  if (validation.maxLength && value.length > validation.maxLength) {
    return validation.message || `최대 ${validation.maxLength}글자까지 입력 가능합니다.`;
  }

  // Pattern 검증
  if (validation.pattern && !validation.pattern.test(value)) {
    return validation.message || "입력 형식이 올바르지 않습니다.";
  }

  return "";
}

/**
 * 여러 필드의 validation 상태를 한 번에 확인
 */
export function validateFields(
  fields: Record<string, { value: string; validation?: ValidationRule }>,
): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};
  let isValid = true;

  for (const [fieldName, field] of Object.entries(fields)) {
    const errorMessage = getValidationErrorMessage(field.value, field.validation);
    if (errorMessage) {
      errors[fieldName] = errorMessage;
      isValid = false;
    }
  }

  return { isValid, errors };
}

/**
 * 단일 필드가 변경되었는지 확인
 */
export function hasFieldChanged(oldValue: string, newValue: string): boolean {
  return oldValue !== newValue;
}

/**
 * 여러 필드 중 하나라도 변경되었는지 확인
 */
export function hasAnyFieldChanged(
  oldValues: Record<string, string>,
  newValues: Record<string, string>,
): boolean {
  for (const key in newValues) {
    if (hasFieldChanged(oldValues[key] || "", newValues[key])) {
      return true;
    }
  }
  return false;
}
