"use server";

import { use } from "react";
import { SWRConfig, unstable_serialize } from "swr";
import BobaFlavorsInitiator from "./BobaFlavorsFetcher/BobaFlavorsInitiator";

interface BobaFlavorsFetcherProps {
  flavorsPromise: Promise<string[]>;
}

const BobaFlavorsFetcher = ({ flavorsPromise }: BobaFlavorsFetcherProps) => {
  const {
    flavors,
    error,
  }: {
    flavors: string[] | null;
    error: Error | null;
  } = use(
    flavorsPromise
      .then((flavors) => {
        return {
          flavors: flavors,
          error: null,
        };
      })
      .catch((err) => {
        return {
          flavors: null,
          error: err as Error,
        };
      })
  );

  const key = unstable_serialize("boba-flavors");

  const fallback = {
    [key]: flavors,
  };

  return (
    <SWRConfig value={{ fallback }}>
      <BobaFlavorsInitiator error={error} />
    </SWRConfig>
  );
};

export default BobaFlavorsFetcher;
