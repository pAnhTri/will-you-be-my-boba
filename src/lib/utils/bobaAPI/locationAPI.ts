import { LocationAPI } from "@/types";
import axios from "axios";

export const getGoogleLocationData = async (
  city?: string,
  range?: number
): Promise<LocationAPI | null> => {
  const baseURL = typeof window === "undefined" ? process.env.API_BASE_URL : "";

  const filter = { city, range };

  const searchParams = new URLSearchParams({ filter: JSON.stringify(filter) });

  return axios
    .get(`${baseURL}/api/location?${searchParams}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      return null;
    });
};
