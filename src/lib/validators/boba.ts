import { z } from "zod";
import mongoose from "mongoose";

export const BobaSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name cannot exceed 100 characters"),

  flavors: z
    .array(
      z
        .string()
        .min(3, "Each flavor must be at least 3 characters long.")
        .max(100, "Each flavor must be shorter than 100 characters.")
        .regex(
          /^[A-Za-z]+$/,
          "Flavor names can only contain alphabetic characters."
        )
    )
    .nonempty("At least one flavor is required"),

  sweetnessLevel: z.enum(["Low", "Medium", "High"]).default("Medium"),

  shopId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid MongoDB ObjectId",
  }),

  communityReviews: z
    .array(
      z.object({
        userName: z.string().min(1, "User name is required"),
        rating: z
          .number()
          .min(0, "Rating must be at least 0")
          .max(5, "Rating cannot exceed 5"),
      })
    )
    .optional()
    .default([]),
});
