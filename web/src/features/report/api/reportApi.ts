import { axiosInstance } from "@/shared/config";
import type { ReportRequestBody } from "./types";

export const postReport = async (body: ReportRequestBody) => {
  const response = await axiosInstance.post("/api/v1/report", body);

  return response;
};
