import axios from "axios";
import { ReportInput } from "@/lib/validators/report";

export const createReport = async (
  payload: ReportInput & { boba: string }
): Promise<string> => {
  try {
    const { data: response } = await axios.post("/api/reports", payload);
    return response.message;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else if (error.request) {
        throw new Error("No response from server");
      } else {
        throw new Error("Unknown error");
      }
    } else {
      throw new Error("Unknown error");
    }
  }
};

export const getAllReports = async () => {
  try {
    const { data: response } = await axios.get("/api/reports");
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else if (error.request) {
        throw new Error("No response from server");
      } else {
        throw new Error("Unknown error");
      }
    } else {
      throw new Error("Unknown error");
    }
  }
};

export const getReportByType = async (type: string) => {
  try {
    const { data: response } = await axios.get(`/api/reports/${type}`);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else if (error.request) {
        throw new Error("No response from server");
      } else {
        throw new Error("Unknown error");
      }
    } else {
      throw new Error("Unknown error");
    }
  }
};
