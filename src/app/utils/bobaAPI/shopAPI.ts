import { ShopAPI } from "@/app/types";
import axios from "axios";

export const getShopData = async (): Promise<ShopAPI | null> => {
  const baseURL = typeof window === "undefined" ? process.env.API_BASE_URL : "";

  return axios
    .get(`${baseURL}/api/shop`)
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      return null;
    });
};
