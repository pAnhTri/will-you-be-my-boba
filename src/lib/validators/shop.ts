import { z } from "zod";

export const ShopSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name cannot exceed 100 characters"),
  location: z.object({
    placesId: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(100, "Name cannot exceed 100 characters"),
    address: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(100, "Name cannot exceed 100 characters"),
    city: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(100, "Name cannot exceed 100 characters"),
    latitude: z
      .number()
      .min(-90, "Latitude must be larger than -90 degrees")
      .max(90, "Latitude must be smaller than 90 degrees"),
    longitude: z
      .number()
      .min(-180, "Longitude must be larger than -180 degrees")
      .max(180, "Longitude must be smaller than 180 degrees"),
  }),
});
