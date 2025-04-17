import { z } from "zod";

export const LocationSchema = z.object({
  city: z
    .string()
    .min(3, "Text must be at least 3 characters")
    .max(100, "Text cannot exceed 100 characters"),
  range: z.number().min(0, "Range must be larger than 0").default(0),
});
