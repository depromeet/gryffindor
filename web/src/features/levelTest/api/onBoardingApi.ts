import { axiosInstance } from "@/shared/config";

interface CreateOnBoardingRequest {
  answers: Answer[];
}

interface Answer {
  questionOrder: number;
  selectedOption: number;
}

interface CreateOnBoardingResponse {
  level: number;
}

export const onBoardingApi = {
  createOnBoarding: async (request: CreateOnBoardingRequest) =>
    await axiosInstance.post<CreateOnBoardingResponse>("/api/v1/onboarding", request),
};
