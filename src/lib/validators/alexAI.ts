import { z } from "zod";

export const alexAiValidatorSchema = z.object({
  query: z.string().min(1, { message: "Query is required" }),
});

export type AlexAIInput = z.infer<typeof alexAiValidatorSchema>;
