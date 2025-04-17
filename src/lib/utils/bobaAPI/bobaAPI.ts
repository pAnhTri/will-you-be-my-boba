import { BobaAPI } from "@/types";
import axios from "axios";
import generateUsername from "../randomUserName";

export const getBobaData = async (): Promise<BobaAPI | null> => {
  const baseURL = typeof window === "undefined" ? process.env.API_BASE_URL : "";

  return axios
    .get(`${baseURL}/api/boba`)
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      return null;
    });
};

export const addBobaToDatabase = async (body: {
  name: string;
  shopId: string;
  flavors: string[];
  sweetnessLevel: "Low" | "Medium" | "High";
}): Promise<{ success: boolean } | null> => {
  const data = {
    ...body,
    communityReviews: [],
  };
  return axios
    .post(`/api/boba`, data)
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      return null;
    });
};

export const updateBobaDatabase = async (name: string, rating: number) => {
  const boba = {
    name,
  };

  const updatedCommunityReview = {
    communityReviews: [
      {
        userName: generateUsername(),
        rating,
      },
    ],
  };

  const searchParams = new URLSearchParams(boba);

  return axios
    .put(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/boba?${searchParams}`,
      updatedCommunityReview
    )
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      return null;
    });
};

export const deleteBobaDatabase = async () => {
  return axios
    .delete(
      `${
        process.env.NEXT_PUBLIC_API_BASE_URL
      }/api/boba?name=${encodeURIComponent("Oolong Milk Tea")}`
    )
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      return null;
    });
};
