"use server";

import { getShops } from "@/lib/utils/actions";
import { Alert } from "@mantine/core";
import ShopsHydrater from "./ShopsHydrater";

const ShopsInitializer = async () => {
  try {
    const shops = await getShops();
    return <ShopsHydrater shops={shops} />;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch reports";
    return <Alert title={errorMessage} color="red" />;
  }
};

export default ShopsInitializer;
