"use client";

import { useState } from "react";
import { getInputConfig, type InputFieldConfig } from "@/shared/config/inputConfig";
import {
  getValidationErrorMessage,
  hasFieldChanged,
  validateValue,
} from "../utils/inputValidation";

interface UseInputFieldReturn {
  // 값과 상태
  value: string;
  setValue: (value: string) => void;

  // 설정
  config: InputFieldConfig | null;

  // Validation 관련
  isValid: boolean;
  errorMessage: string;

  // 변경 감지
  hasChanged: boolean;

  // Input 컴포넌트에 바로 전달할 수 있는 props
  inputProps: {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    placeholder?: string;
    validation?: InputFieldConfig["validation"];
    type?: InputFieldConfig["type"];
    resetButton?: boolean;
  };
}

/**
 * Input 필드를 위한 커스텀 훅
 * 설정 불러오기, validation, 상태 관리를 한 번에 처리
 */
export function useInputField(
  page: string,
  fieldName: string,
  initialValue: string = "",
): UseInputFieldReturn {
  const [value, setValue] = useState(initialValue);

  // Config에서 설정 가져오기
  const config = getInputConfig(page, fieldName);

  // Validation 상태 계산
  const isValid = validateValue(value, config?.validation);
  const errorMessage = getValidationErrorMessage(value, config?.validation);

  // 변경 감지
  const hasChanged = hasFieldChanged(initialValue, value);

  // Input 컴포넌트에 바로 전달할 수 있는 props
  const inputProps = {
    value,
    onChange: setValue,
    label: config?.label,
    placeholder: config?.placeholder,
    validation: config?.validation,
    type: config?.type,
    resetButton: config?.resetButton,
  };

  return {
    value,
    setValue,
    config,
    isValid,
    errorMessage,
    hasChanged,
    inputProps,
  };
}

/**
 * 특정 페이지의 특정 필드를 위한 편의 훅들
 * 자주 사용되는 조합들을 미리 정의
 */
export const useNicknameInput = (initialValue: string = "") =>
  useInputField("nickname", "nickname", initialValue);

export const useReviewInput = (initialValue: string = "") =>
  useInputField("review", "review", initialValue);
