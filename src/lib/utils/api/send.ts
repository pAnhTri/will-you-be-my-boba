import { EmailContactInput } from "@/lib/validators/emailContact";
import axios from "axios";

export const sendEmail = async (payload: EmailContactInput) => {
  try {
    const { data } = await axios.post("/api/send", payload);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `API Error: ${error.response?.status || "Unknown Status"}; Message: ${error.response?.data.error.message || "Unknown Message"}`
      );
    }
    throw new Error("Something went wrong");
  }
};
