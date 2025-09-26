import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface Question {
  id: string;
  type: "single" | "multiple";
  question: string;
  options: Array<{
    id: string;
    text: string;
  }>;
}

export interface Answer {
  questionId: string;
  selectedOptions: string[];
}

export interface BackendAnswer {
  questionOrder: number;
  selectedOption: number;
}

export interface LevelTestRequest {
  answers: BackendAnswer[];
}

export interface LevelTestResponse {
  level: number;
}

interface LevelTestState {
  // 현재 진행 상태
  currentStep: number;
  totalSteps: number;
  isCompleted: boolean;

  // 답변 데이터
  answers: Answer[];

  // 백엔드로부터 받은 결과
  result: LevelTestResponse | null;

  // Actions
  setCurrentStep: (step: number) => void;
  setAnswer: (questionId: string, selectedOptions: string[]) => void;
  getAnswer: (questionId: string) => Answer | undefined;
  setResult: (result: LevelTestResponse) => void;
  resetTest: () => void;
  getProgress: () => number;
  getBackendRequestData: () => LevelTestRequest;
}

// 레벨테스트 질문 데이터
export const LEVEL_TEST_QUESTIONS: Question[] = [
  {
    id: "q1",
    type: "single",
    question: "혼밥할 때 주로 어떤 메뉴를 드세요?",
    options: [
      { id: "q1_1", text: "간편식/즉석식, 패스트푸드, 분식류" },
      { id: "q1_2", text: "국밥, 라면, 돈까스, 카레, 초밥, 카페/디저트" },
      { id: "q1_3", text: "백반, 파스타, 중국집, 냉면, 갈국수" },
      { id: "q1_4", text: "닭갈비, 찜닭, 고기구이, 감자탕/전골, 족발/보쌈" },
    ],
  },
  {
    id: "q2",
    type: "single",
    question: "혼밥할 때 어떤 좌석이 편하세요?",
    options: [
      { id: "q2_1", text: "바(bar) 좌석만 찾아요 " },
      { id: "q2_2", text: "1~2인석을 선호해요" },
      { id: "q2_3", text: "4인석, 눈치 보이지만 앉을 수 있어요" },
      { id: "q2_4", text: "어떤 좌석이든 상관없어요" },
    ],
  },
  {
    id: "q3",
    type: "single",
    question: "혼밥할 때 주변 시선이 부담스러운 적이 있나요?",
    options: [
      { id: "q3_1", text: "너무 부담돼서 혼밥을 잘 못 해요" },
      { id: "q3_2", text: "혼밥석이 있으면 괜찮아요" },
      { id: "q3_3", text: "조금 신경 쓰이는 정도예요" },
      { id: "q3_4", text: "전혀 신경쓰지 않아요" },
    ],
  },
  {
    id: "q4",
    type: "single",
    question: "원한다면 2인 메뉴도 혼자 도전할 수 있나요?",
    options: [
      { id: "q4_1", text: "전혀 못 해요" },
      { id: "q4_2", text: "가끔 먹지만 부담돼요" },
      { id: "q4_3", text: "상황에 따라 시도할 수 있어요" },
      { id: "q4_4", text: "네, 혼자서도 문제없어요" },
    ],
  },
  {
    id: "q5",
    type: "single",
    question: "혼밥할 때 어떤 점이 가장 중요한가요?",
    options: [
      { id: "q5_1", text: "빠르고 간편하게 먹을 수 있어야 해요" },
      { id: "q5_2", text: "1인 메뉴가 있어야 해요" },
      { id: "q5_3", text: "다양한 메뉴를 즐길 수 있어야 해요" },
      { id: "q5_4", text: "혼하늘 음식이며 조건은 상관없어요" },
    ],
  },
];

export const useLevelTestStore = create<LevelTestState>()(
  persist(
    (set, get) => ({
      currentStep: 1,
      totalSteps: LEVEL_TEST_QUESTIONS.length,
      isCompleted: false,
      answers: [],
      result: null,

      setCurrentStep: (step) => set({ currentStep: step }),

      setAnswer: (questionId, selectedOptions) => {
        const state = get();
        const existingAnswerIndex = state.answers.findIndex(
          (answer) => answer.questionId === questionId,
        );

        const newAnswer: Answer = { questionId, selectedOptions };

        if (existingAnswerIndex >= 0) {
          const newAnswers = [...state.answers];
          newAnswers[existingAnswerIndex] = newAnswer;
          set({ answers: newAnswers });
        } else {
          set({ answers: [...state.answers, newAnswer] });
        }
      },

      getAnswer: (questionId) => {
        return get().answers.find((answer) => answer.questionId === questionId);
      },

      setResult: (result) => set({ result, isCompleted: true }),

      getBackendRequestData: () => {
        const state = get();
        const answers: BackendAnswer[] = [];

        state.answers.forEach((answer) => {
          const questionIndex = LEVEL_TEST_QUESTIONS.findIndex((q) => q.id === answer.questionId);
          if (questionIndex !== -1 && answer.selectedOptions.length > 0) {
            const question = LEVEL_TEST_QUESTIONS[questionIndex];
            const optionIndex = question.options.findIndex(
              (opt) => opt.id === answer.selectedOptions[0],
            );

            if (optionIndex !== -1) {
              answers.push({
                questionOrder: questionIndex + 1, // 1-based index로 변환
                selectedOption: optionIndex + 1, // 1-based index로 변환
              });
            }
          }
        });

        return { answers };
      },

      resetTest: () =>
        set({
          currentStep: 1,
          isCompleted: false,
          answers: [],
          result: null,
        }),

      getProgress: () => {
        const state = get();
        return (state.answers.length / state.totalSteps) * 100;
      },
    }),
    {
      name: "level-test-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        answers: state.answers,
        currentStep: state.currentStep,
        isCompleted: state.isCompleted,
        result: state.result,
      }),
    },
  ),
);
