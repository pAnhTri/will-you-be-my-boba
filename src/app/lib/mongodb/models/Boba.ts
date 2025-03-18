import mongoose from "mongoose";

const BobaSchema = new mongoose.Schema({
  shopId: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },
  ],
  name: {
    type: String,
    required: [true, "Must enter valid name"],
    unique: true,
  },
  flavors: { type: [String], required: [true, "Must enter valid flavors"] },
  sweetnessLevel: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium",
  },
  communityReviews: [
    {
      userName: {
        type: String,
        required: [true, "Must enter valid user name"],
      },
      rating: {
        type: Number,
        default: 0,
        required: [true, "Must enter valid rating"],
      },
    },
  ],
});

const Boba = mongoose.models.Boba || mongoose.model("Boba", BobaSchema);

export default Boba;
