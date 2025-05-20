import { z } from "zod";

export const magicLinkValidatorSchema = z.object({
  email: z.string().email(),
});

export type MagicLinkInput = z.infer<typeof magicLinkValidatorSchema>;
