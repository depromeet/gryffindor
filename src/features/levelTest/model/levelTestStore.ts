import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface Question {
  id: string;
  type: "single" | "multiple";
  question: string;
  options: Array<{
    id: string;
    text: string;
    weight: number;
  }>;
}

export interface Answer {
  questionId: string;
  selectedOptions: string[];
}

interface LevelTestState {
  // 현재 진행 상태
  currentStep: number;
  totalSteps: number;
  isCompleted: boolean;

  // 답변 데이터
  answers: Answer[];

  // 계산된 결과
  result: {
    level: number;
    categories: Record<string, number>;
    recommendations: string[];
  } | null;

  // Actions
  setCurrentStep: (step: number) => void;
  setAnswer: (questionId: string, selectedOptions: string[]) => void;
  getAnswer: (questionId: string) => Answer | undefined;
  calculateResult: () => void;
  resetTest: () => void;
  getProgress: () => number;
}

// 레벨테스트 질문 데이터
export const LEVEL_TEST_QUESTIONS: Question[] = [
  {
    id: "q1",
    type: "single",
    question: "혼밥할 때 주로 어떤 메뉴를 드세요?",
    options: [
      { id: "q1_1", text: "간편식/즉석식, 패스트푸드, 분식류", weight: 1 },
      { id: "q1_2", text: "국밥, 라면, 돈까스, 카레, 초밥/카페/디저트", weight: 2 },
      { id: "q1_3", text: "백반, 파스타, 중국집, 냉면, 갈국수", weight: 3 },
      { id: "q1_4", text: "타깨비, 찜닭, 그릇, 감치탕/곰탕, 족발/보쌈", weight: 4 },
    ],
  },
  {
    id: "q2",
    type: "single",
    question: "혼밥할 때 어떤 좌석이 편하세요?",
    options: [
      { id: "q2_1", text: "바 테이블 좌석이 좋아요", weight: 4 },
      { id: "q2_2", text: "1~2인석 선호해요", weight: 3 },
      { id: "q2_3", text: "4인석, 눈치 보이면 앉을 수 있어요", weight: 2 },
      { id: "q2_4", text: "어떤 좌석이든 상관없어요", weight: 1 },
    ],
  },
  {
    id: "q3",
    type: "single",
    question: "혼밥할 때 주변 시선이 부담될 것 없나요?",
    options: [
      { id: "q3_1", text: "내무 부담돼서 혼밥을 잘 못 해요", weight: 1 },
      { id: "q3_2", text: "혼밥이익 있으면 괜찮아요", weight: 2 },
      { id: "q3_3", text: "초급 신경 쓰이는 정도예요", weight: 3 },
      { id: "q3_4", text: "전혀 신경쓰지 않아요", weight: 4 },
    ],
  },
  {
    id: "q4",
    type: "single",
    question: "원하다면 2인 메뉴도 혼자 도전할 수 있나요?",
    options: [
      { id: "q4_1", text: "전혀 못 해요", weight: 1 },
      { id: "q4_2", text: "가끔 먹지만 부담돼요", weight: 2 },
      { id: "q4_3", text: "상황에 따라 시도할 수 있어요", weight: 3 },
      { id: "q4_4", text: "네, 혼자서도 문제없어요", weight: 4 },
    ],
  },
  {
    id: "q5",
    type: "single",
    question: "혼밥할 때 어떤 점이 가장 중요한가요?",
    options: [
      { id: "q5_1", text: "빠르고 간편하게 먹을 수 있어야 해요", weight: 1 },
      { id: "q5_2", text: "1인 메뉴가 있어야 해요", weight: 2 },
      { id: "q5_3", text: "다양한 메뉴를 즐길 수 있어야 해요", weight: 3 },
      { id: "q5_4", text: "혼하늘 음식이며 조건은 상관없어요", weight: 4 },
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

      calculateResult: () => {
        const state = get();
        let totalScore = 0;
        let answeredQuestions = 0;

        for (const answer of state.answers) {
          const question = LEVEL_TEST_QUESTIONS.find((q) => q.id === answer.questionId);
          if (question) {
            answeredQuestions++;
            for (const optionId of answer.selectedOptions) {
              const option = question.options.find((opt) => opt.id === optionId);
              if (option) {
                totalScore += option.weight;
              }
            }
          }
        }

        // 레벨 계산 (1-5 레벨)
        const averageScore = totalScore / answeredQuestions;
        let level = 1;
        if (averageScore >= 3.5) level = 5;
        else if (averageScore >= 2.8) level = 4;
        else if (averageScore >= 2.2) level = 3;
        else if (averageScore >= 1.5) level = 2;

        const result = {
          level,
          categories: { total: totalScore },
          recommendations: getLevelRecommendations(level),
        };

        set({
          result,
          isCompleted: true,
        });
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

function getLevelRecommendations(level: number): string[] {
  const recommendations = {
    1: ["간편식 위주의 혼밥 스팟", "부담 없는 분위기의 카페", "테이크아웃 전문점"],
    2: ["1인석이 잘 갖춰진 식당", "혼밥족 친화적인 국밥집", "체인점 위주 추천"],
    3: ["다양한 메뉴의 일반 식당", "혼밥하기 편한 분위기", "중급자용 맛집"],
    4: ["고급 레스토랑도 도전", "2인 메뉴 혼자 주문 가능", "모든 종류의 맛집"],
    5: ["혼밥 마스터 레벨", "어떤 식당이든 자유자재", "새로운 도전 추천"],
  };

  return recommendations[level as keyof typeof recommendations] || recommendations[1];
}
