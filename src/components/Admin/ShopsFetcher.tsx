"use server";

import { getShops } from "@/lib/utils/actions/shop";
import ShopsInitiator from "./ShopsFetcher/ShopsInitiator";
import { ShopDocument } from "@/lib/mongodb/models/Shop";

const ShopsFetcher = async () => {
  let shops: ShopDocument[] | null = null;
  let errorMessage: string | null = null;

  try {
    shops = await getShops();
  } catch (error) {
    shops = null;
    errorMessage =
      error instanceof Error ? error.message : "Failed to fetch shops";
  }

  return <ShopsInitiator shops={shops} errorMessage={errorMessage} />;
};

export default ShopsFetcher;
