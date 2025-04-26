import { z } from "zod";

export const shopSearchValidatorSchema = z.object({
  search: z
    .string()
    .max(100, "Search must be less than 100 characters")
    .optional(),
});

export type ShopSearchInput = z.infer<typeof shopSearchValidatorSchema>;
