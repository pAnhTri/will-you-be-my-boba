import { z } from "zod/v4";
import mongoose from "mongoose";

export const reportValidatorSchema = z
  .object({
    reportType: z.enum(
      ["Flavor", "Shop", "Name", "Other"],
      "Report Type is required"
    ),
    shop: z
      .string()
      .min(1, "Please provide a shop name")
      .refine(
        (val) => mongoose.Types.ObjectId.isValid(val),
        "Must be a valid shop"
      )
      .optional(),
    comment: z
      .string()
      .max(500, "Comment cannot exceed 500 characters")
      .optional(),
  })
  .refine(
    (data) => {
      // Make shop required when reportType is "Shop"
      if (data.reportType === "Shop") {
        return data.shop && data.shop.trim() !== "";
      }
      return true;
    },
    {
      message: "Please provide a shop name",
      path: ["shop"],
    }
  );

export type ReportInput = z.infer<typeof reportValidatorSchema>;
