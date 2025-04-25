import mongoose, { InferSchemaType } from "mongoose";

const CommunityReviewSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Must enter valid user name"],
    trim: true,
    minlength: [2, "Username must be at least 2 characters long"],
  },
  userId: {
    type: String,
    required: false,
    default: null,
  },
  review: {
    type: String,
    required: false,
    default: null,
    trim: true,
    maxlength: [500, "Review cannot exceed 500 characters"],
  },
  rating: {
    type: Number,
    required: [true, "Must enter valid rating"],
    min: [0, "Rating must be between 0 and 5"],
    max: [5, "Rating must be between 0 and 5"],
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isEdited: {
    type: Boolean,
    default: false,
  },
});

const BobaSchema = new mongoose.Schema({
  shopId: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },
  ],
  name: {
    type: String,
    required: [true, "Must enter valid name"],
    unique: true,
    trim: true,
    minlength: [2, "Name must be at least 2 characters long"],
  },
  flavors: {
    type: [String],
    required: [true, "Must enter valid flavors"],
    validate: {
      validator: function (v: string[]) {
        return v.length > 0;
      },
      message: "Must have at least one flavor",
    },
  },
  sweetnessLevel: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium",
  },
  communityReviews: {
    type: [CommunityReviewSchema],
    default: [],
  },
});

const Boba = mongoose.models.Boba || mongoose.model("Boba", BobaSchema);

export type BobaType = InferSchemaType<typeof BobaSchema>;
export type CommunityReviewType = InferSchemaType<typeof CommunityReviewSchema>;

export default Boba;
