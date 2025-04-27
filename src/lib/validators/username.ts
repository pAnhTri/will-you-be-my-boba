import z from "zod";

export const usernameValidatorSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters"),
});

export type usernameInput = z.infer<typeof usernameValidatorSchema>;
