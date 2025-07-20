"use server";

import { getBobaFlavors } from "@/lib/utils/actions/boba";
import FlavorInitiator from "./FlavorFetcher/FlavorInitiator";

const FlavorFetcher = async () => {
  let flavors: string[] | null = null;
  let errorMessage: string | null = null;

  try {
    flavors = await getBobaFlavors();
  } catch (error) {
    flavors = null;
    errorMessage =
      error instanceof Error ? error.message : "Failed to fetch flavors";
  }

  return <FlavorInitiator flavors={flavors} errorMessage={errorMessage} />;
};

export default FlavorFetcher;
