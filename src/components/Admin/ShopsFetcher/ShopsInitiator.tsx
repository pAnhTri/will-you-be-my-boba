"use client";

import { useShops } from "@/lib/utils/hooks";
import { useShopStore } from "@/lib/zustand/stores";
import { Alert } from "@mantine/core";
import { useEffect } from "react";

interface ShopsInitiatorProps {
  error: Error | null;
}

const ShopsInitiator = ({ error }: ShopsInitiatorProps) => {
  const { shops } = useShops();

  const setShopDocuments = useShopStore((state) => state.setShopDocuments);
  const setShopsError = useShopStore((state) => state.setShopsError);
  const setIsShopsLoading = useShopStore((state) => state.setIsShopsLoading);

  useEffect(
    () => {
      if (shops) {
        setShopDocuments(shops);
      }

      if (error) {
        setShopsError(error.message);
      }

      setIsShopsLoading(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [shops, error]
  );

  if (error) {
    return (
      <Alert color="red" title="Error">
        {error.message}
      </Alert>
    );
  }
  return null;
};

export default ShopsInitiator;
