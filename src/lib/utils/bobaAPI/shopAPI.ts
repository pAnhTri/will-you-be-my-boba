import { ShopSchema } from "@/lib/validators";
import { GooglePlace, ShopAPI } from "@/types";
import axios from "axios";
import { z } from "zod";

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

export const addShopToDatabase = async (shop: GooglePlace) => {
  const baseURL = typeof window === "undefined" ? process.env.API_BASE_URL : "";

  const cityComponent = shop.addressComponents.find((component) => {
    return component.types.includes("locality");
  });
  const city = cityComponent && cityComponent.shortText;

  const newBobaShop: z.infer<typeof ShopSchema> = {
    name: shop.displayName.text,
    location: {
      placesId: shop.id,
      address: shop.formattedAddress,
      city: city ?? "N/A",
      latitude: shop.location.latitude,
      longitude: shop.location.longitude,
    },
  };

  return axios
    .post(`${baseURL}/api/shop`, newBobaShop)
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      return null;
    });
};
