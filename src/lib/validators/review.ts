import { z } from "zod";

export const reviewValidatorSchema = z.object({
  rating: z
    .number()
    .min(0, "Review must be between 0 and 5")
    .max(5, "Review must be between 0 and 5"),
  review: z
    .string()
    .max(500, "Review cannot be longer than 500 characters")
    .optional()
    .default(""),
});

export type ReviewInput = z.infer<typeof reviewValidatorSchema>;
