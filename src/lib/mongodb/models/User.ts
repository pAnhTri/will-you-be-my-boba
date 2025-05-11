import mongoose, { InferSchemaType } from "mongoose";

enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

const userReviewSchema = new mongoose.Schema({
  bobaId: { type: String, required: true },
  rating: { type: Number, required: true },
  review: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  supabaseId: { type: String, required: true, unique: true },
  username: { type: String, required: false, unique: true, default: null },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: Role, default: Role.USER },
  reviews: { type: [userReviewSchema], default: [] },
  favoriteShops: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Shop",
    default: [],
  },
  avatar: { type: String, required: false, default: null },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export type UserType = InferSchemaType<typeof userSchema>;
export type UserReviewType = InferSchemaType<typeof userReviewSchema>;

export default User;
