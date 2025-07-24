"use server";

import { getBobaFlavors } from "@/lib/utils/actions";
import { Alert } from "@mantine/core";
import BobaFlavorsHydrater from "./BobaFlavorsHydrater";

const BobaFlavorsInitializer = async () => {
  try {
    const flavors = await getBobaFlavors();
    return <BobaFlavorsHydrater flavors={flavors} />;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch flavors";
    return <Alert title={errorMessage} color="red" />;
  }
};

export default BobaFlavorsInitializer;
