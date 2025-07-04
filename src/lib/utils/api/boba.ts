import { ReviewInput } from "@/lib/validators/review";
import { Boba } from "@/types/boba";
import axios from "axios";

export const getBobas = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/boba`
    );
    return data as {
      success: boolean;
      bobas: Boba[];
      flavors: string[];
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `API Error: ${error.response?.status || "Unknown Status"}; Message: ${
          error.response?.data.error.message || "Unknown Message"
        }`
      );
    }
    throw new Error("Something went wrong");
  }
};

export const addBoba = async (payload: {
  name: string;
  flavors: string[];
  shopId: string;
  sweetness: {
    sweetnessLevel: "Low" | "Medium" | "High";
    shopId: string;
  };
}) => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/boba`,
      payload
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `API Error: ${error.response?.status || "Unknown Status"}; Message: ${
          error.response?.data.error.message || "Unknown Message"
        }`
      );
    }
    throw new Error("Something went wrong");
  }
};

export const addCommunityReview = async (
  payload: ReviewInput & { userId: string | null; shopId: string | null },
  bobaId: string
) => {
  try {
    const { data } = await axios.put(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/boba/${encodeURIComponent(
        bobaId
      )}`,
      payload
    );
    return data;
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        `API Error: ${error.response?.status || "Unknown Status"}; Message: ${
          error.response?.data.error.message || "Unknown Message"
        }`
      );
    }
    throw new Error("Something went wrong");
  }
};

export const deleteCommunityReview = async (
  reviewId: string,
  bobaId: string
) => {
  try {
    const { data } = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/boba/${encodeURIComponent(
        bobaId
      )}/community-review/${encodeURIComponent(reviewId)}`
    );
    return data;
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        `API Error: ${error.response?.status || "Unknown Status"}; Message: ${
          error.response?.data.error.message || "Unknown Message"
        }`
      );
    }
    throw new Error("Something went wrong");
  }
};

export const updateCommunityReview = async (
  payload: ReviewInput,
  reviewId: string,
  bobaId: string
) => {
  try {
    const { data } = await axios.put(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/boba/${encodeURIComponent(
        bobaId
      )}/community-review/${encodeURIComponent(reviewId)}`,
      payload
    );
    return data;
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        `API Error: ${error.response?.status || "Unknown Status"}; Message: ${
          error.response?.data.error.message || "Unknown Message"
        }`
      );
    }
    throw new Error("Something went wrong");
  }
};

export const getBobaByName = async (name: string): Promise<Boba> => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/boba/name/${encodeURIComponent(name)}`
    );
    return data.boba;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `API Error: ${error.response?.status || "Unknown Status"}; Message: ${
          error.response?.data.error.message || "Unknown Message"
        }`
      );
    }
    throw new Error("Something went wrong");
  }
};
