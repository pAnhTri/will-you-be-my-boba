import mongoose from "mongoose";
import { z } from "zod";

export const bobaValidatorSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(2, { message: "Name must be at least 2 characters long" }),
  flavors: z
    .array(z.string())
    .min(1, { message: "Must have at least one flavor" }),
  sweetnessLevel: z.enum(["Low", "Medium", "High"], {
    required_error: "Sweetness level is required",
  }),
  shop: z
    .string()
    .min(1, { message: "Must enter valid shop" })
    .refine((value) => mongoose.Types.ObjectId.isValid(value), {
      message: "Must enter valid shop",
    }),
});

export type BobaInput = z.infer<typeof bobaValidatorSchema>;
