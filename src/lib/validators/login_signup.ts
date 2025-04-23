import z from "zod";

export const loginSignupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export type LoginSignupInput = z.infer<typeof loginSignupSchema>;
