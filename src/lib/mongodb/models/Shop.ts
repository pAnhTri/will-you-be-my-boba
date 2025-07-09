import mongoose, { InferSchemaType } from "mongoose";

const LocationSchema = new mongoose.Schema({
  placesId: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

const ShopSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Must enter valid name"] },
  location: { type: LocationSchema, required: true },
});

const Shop = mongoose.models.Shop || mongoose.model("Shop", ShopSchema);

export type ShopType = InferSchemaType<typeof ShopSchema>;
export type ShopDocument = mongoose.HydratedDocumentFromSchema<
  typeof ShopSchema
>;

export default Shop;
