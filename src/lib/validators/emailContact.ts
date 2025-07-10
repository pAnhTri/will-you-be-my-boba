import { z } from "zod";

export const emailContactValidatorSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  message: z.string().min(1, { message: "Message is required" }),
});

export type EmailContactInput = z.infer<typeof emailContactValidatorSchema>;
