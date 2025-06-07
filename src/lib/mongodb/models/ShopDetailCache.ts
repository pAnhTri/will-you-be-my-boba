import mongoose, { InferSchemaType } from "mongoose";

const ShopDetailCacheSchema = new mongoose.Schema({
  placeId: { type: String, required: true, unique: true },
  rating: { type: Number, required: true },
  userRatingCount: { type: Number, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create TTL index explicitly
ShopDetailCacheSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 60 * 60 * 24 * 7 }
);

const ShopDetailCache =
  mongoose.models.ShopDetailCache ||
  mongoose.model("ShopDetailCache", ShopDetailCacheSchema);

export type ShopDetailCacheType = InferSchemaType<typeof ShopDetailCacheSchema>;

export default ShopDetailCache;
