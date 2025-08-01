"use server";

import { getBobasPaginationAction } from "@/lib/utils/actions";
import { Alert } from "@mantine/core";
import BobasHydrater from "./BobasHydrater";

const BobasInitiator = async () => {
  try {
    const bobas = await getBobasPaginationAction("", 0, 20, "name", "asc", "");
    return <BobasHydrater bobas={bobas} />;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch bobas";
    return <Alert title={errorMessage} color="red" />;
  }
};

export default BobasInitiator;
