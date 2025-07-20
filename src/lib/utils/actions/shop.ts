"use server";

import { dbConnect } from "@/lib/mongodb";
import Shop, { ShopDocument } from "@/lib/mongodb/models/Shop";

export const getShops = async (): Promise<ShopDocument[]> => {
  try {
    await dbConnect();

    const shops = await Shop.find();

    await new Promise((resolve) => setTimeout(resolve, 10000));

    return JSON.parse(JSON.stringify(shops));
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to get shops"
    );
  }
};

export const getShopNameById = async (shopId: string): Promise<string> => {
  interface selectedShopDocument {
    name: string;
    location: {
      city: string;
    };
  }

  try {
    await dbConnect();

    const shop = await Shop.findById<selectedShopDocument>(shopId).select({
      name: 1,
      location: {
        city: 1,
      },
    });

    if (!shop) {
      throw new Error("Shop not found");
    }

    return `${shop.name} (${shop.location.city})`;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to get shop name"
    );
  }
};
