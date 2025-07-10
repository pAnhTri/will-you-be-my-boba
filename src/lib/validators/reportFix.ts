import { z } from "zod";
import mongoose from "mongoose";

const name = z
  .string()
  .min(1, "Name is required")
  .regex(
    /^[\p{L} '-.]{1,100}$/u,
    "Name must be 1-100 and contain only letters, spaces, hyphens, and apostrophes"
  );

const flavors = z
  .array(z.string().min(1, "Flavor is required"))
  .min(1, "At least one flavor is required");

const shops = z
  .array(
    z.string().refine((value) => mongoose.Types.ObjectId.isValid(value), {
      message: "Invalid shop ID",
    })
  )
  .min(1, "At least one shop is required");

export const reportFixValidator = z.object({
  name,
  flavors,
  shops,
});

export type ReportFixInput = z.infer<typeof reportFixValidator>;
