import mongoose from "mongoose";
import { z } from "zod";
import { escapeHTML } from "../utils";

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

const shopId = z
  .string()
  .refine((value) => mongoose.Types.ObjectId.isValid(value), {
    message: "Must enter valid shop",
  });

export const communityReviewDocumentValidatorSchema = z.object({
  userName: z
    .string({ message: "User name is required" })
    .min(2, { message: "User name must be at least 2 characters long" }),
  userId: z.string().optional(),
  review: z.string().optional(),
  rating: z
    .number()
    .min(0)
    .max(5, { message: "Rating must be between 0 and 5" }),
  shopId,
});

export const sweetnessDocumentValidatorSchema = z.object({
  sweetnessLevel: z.enum(["Low", "Medium", "High"], {
    message: "Sweetness level is required",
  }),
  shopId,
});

export const bobaDocumentValidatorSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(2, { message: "Name must be at least 2 characters long" }),
  flavors: z
    .array(z.string())
    .min(1, { message: "Must have at least one flavor" }),
  shopId: z.array(shopId).min(1, { message: "Must have at least one shop" }),
  sweetness: z.array(sweetnessDocumentValidatorSchema).default([]),
  communityReviews: z.array(communityReviewDocumentValidatorSchema).default([]),
});

// All possible inputs for the boba form
export const bobaFormValidator = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .transform((val) => escapeHTML(val.trim().toLowerCase())),
  flavors: z
    .array(
      z
        .string()
        .min(3, { message: "Flavor must be at least 3 characters long" })
    )
    .min(1, { message: "Must have at least one flavor" }),
  shopId: z.array(shopId).min(1, { message: "Must have at least one shop" }),
  sweetness: z.array(sweetnessDocumentValidatorSchema).optional(),
});

export type BobaInput = z.infer<typeof bobaValidatorSchema>;
export type BobaDocumentInput = z.infer<typeof bobaDocumentValidatorSchema>;
export type BobaFormInput = z.infer<typeof bobaFormValidator>;
export type SweetnessDocumentInput = z.infer<
  typeof sweetnessDocumentValidatorSchema
>;
