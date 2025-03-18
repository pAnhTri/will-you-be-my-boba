import mongoose from "mongoose";

const ShopSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Must enter valid name"] },
  location: {
    placesId: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
  },
});

const Shop = mongoose.models.Shop || mongoose.model("Shop", ShopSchema);

export default Shop;
