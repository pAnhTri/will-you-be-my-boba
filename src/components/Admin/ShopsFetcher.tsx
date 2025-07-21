"use server";

import { ShopDocument } from "@/lib/mongodb/models/Shop";
import { use } from "react";
import { SWRConfig, unstable_serialize } from "swr";
import ShopsInitiator from "./ShopsFetcher/ShopsInitiator";

interface ShopsFetcherProps {
  shopsPromise: Promise<ShopDocument[]>;
}

const ShopsFetcher = ({ shopsPromise }: ShopsFetcherProps) => {
  const {
    shops,
    error,
  }: {
    shops: ShopDocument[] | null;
    error: Error | null;
  } = use(
    shopsPromise
      .then((shops) => {
        return {
          shops: shops,
          error: null,
        };
      })
      .catch((err) => {
        return {
          shops: null,
          error: err as Error,
        };
      })
  );

  const key = unstable_serialize("shops");

  const fallback = {
    [key]: shops,
  };

  return (
    <SWRConfig value={{ fallback }}>
      <ShopsInitiator error={error} />
    </SWRConfig>
  );
};

export default ShopsFetcher;
