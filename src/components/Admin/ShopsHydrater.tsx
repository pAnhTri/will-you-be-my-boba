"use client";

import { ShopDocument } from "@/lib/mongodb/models/Shop";
import { useShops } from "@/lib/utils/hooks";
import { useEffect } from "react";

interface ShopsHydraterProps {
  shops: ShopDocument[];
}

const ShopsHydrater = ({ shops }: ShopsHydraterProps) => {
  const { mutate } = useShops();

  useEffect(
    () => {
      mutate(shops, { revalidate: false });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return null;
};

export default ShopsHydrater;
