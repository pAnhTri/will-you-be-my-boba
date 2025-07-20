"use client";

import { ShopDocument } from "@/lib/mongodb/models/Shop";
import { useShopStore } from "@/lib/zustand/stores";
import { Text } from "@mantine/core";
import { useEffect } from "react";

interface ShopsInitiatorProps {
  shops: ShopDocument[] | null;
  errorMessage: string | null;
}

const ShopsInitiator = ({ shops, errorMessage }: ShopsInitiatorProps) => {
  const setIsShopsLoading = useShopStore((state) => state.setIsShopsLoading);
  const setShopDocuments = useShopStore((state) => state.setShopDocuments);

  useEffect(() => {
    if (shops) {
      setShopDocuments(shops);
    } else {
      setShopDocuments([]);
    }
    setIsShopsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (errorMessage) {
    return <Text c="red">{errorMessage}</Text>;
  }

  return null;
};

export default ShopsInitiator;
