import { z } from "zod";

export const locationValidatorSchema = z.object({
  location: z
    .string()
    .min(1, { message: "Location is required" })
    .max(100, { message: "Location must be less than 100 characters" }),
});

export type LocationInput = z.infer<typeof locationValidatorSchema>;
