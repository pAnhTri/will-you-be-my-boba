import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: {
        values: ["Shop", "Flavor", "Name", "Other", "Solved"],
        message: "Invalid report type",
      },
      required: true,
    },
    boba: {
      type: String,
      required: [true, "Must enter valid boba name"],
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

export type ReportType = mongoose.InferSchemaType<typeof ReportSchema>;

export type ReportDocument = mongoose.HydratedDocumentFromSchema<
  typeof ReportSchema
>;

const Report = mongoose.models.Report || mongoose.model("Report", ReportSchema);

export default Report;
