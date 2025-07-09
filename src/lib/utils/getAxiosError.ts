import axios from "axios";

export const getAxiosError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return `API Error: ${error.response.data.message}`;
    } else if (error.request) {
      return "No response received from server";
    } else if (error.message) {
      return error.message;
    } else {
      return "Something went wrong";
    }
  }
  return "Something went wrong";
};
