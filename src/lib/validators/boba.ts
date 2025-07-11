import mongoose from "mongoose";
import { z } from "zod";

export const bobaValidatorSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(2, { message: "Name must be at least 2 characters long" }),
  flavors: z
    .array(z.string())
    .min(1, { message: "Must have at least one flavor" }),
  sweetnessLevel: z.enum(["Low", "Medium", "High"], {
    message: "Sweetness level is required",
  }),
  shop: z
    .string()
    .min(1, { message: "Must enter valid shop" })
    .refine((value) => mongoose.Types.ObjectId.isValid(value), {
      message: "Must enter valid shop",
    }),
});

export const bobaDocumentValidatorSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(2, { message: "Name must be at least 2 characters long" }),
  flavors: z
    .array(z.string())
    .min(1, { message: "Must have at least one flavor" }),
  shopId: z
    .array(
      z.string().refine((value) => mongoose.Types.ObjectId.isValid(value), {
        message: "Must enter valid shop",
      })
    )
    .min(1, { message: "Must have at least one shop" }),
});

export type BobaInput = z.infer<typeof bobaValidatorSchema>;
