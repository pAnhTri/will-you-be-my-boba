import { z } from "zod";

export const EnjoymentScoreSchema = z.object({
  enjoymentFactor: z
    .number()
    .min(0, "Enjoyment must be at least 0")
    .max(5, "Enoyment cannot exceed 5"),
});
