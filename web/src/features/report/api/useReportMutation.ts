import { useMutation } from "@tanstack/react-query";
import type { ApiResponse } from "@/shared/model";
import { postReport } from "./reportApi";

interface UseReportMutationOptions {
  onSuccess?: (data: ApiResponse<unknown>) => void;
  onError?: (error: Error) => void;
}

export const useReportMutation = ({ onSuccess, onError }: UseReportMutationOptions = {}) => {
  return useMutation({
    mutationFn: postReport,
    onSuccess,
    onError,
  });
};
