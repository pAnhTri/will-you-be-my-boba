import { ShopType } from "@/lib/mongodb/models/Shop";
import { Shop } from "@/types";
import axios from "axios";

export const addShop = async (payload: ShopType) => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/shop`,
      { data: payload }
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

export const getShopById = async (_id: string): Promise<Shop> => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/shop/${_id}`
    );
    return data.shop;
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
