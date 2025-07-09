import { BobaDocument } from "@/lib/mongodb/models/Boba";
import { ShopDocument } from "@/lib/mongodb/models/Shop";
import { useCallback, useEffect, useState } from "react";
import { getBobaDocumentByName, getFlavors } from "../api/boba";
import { getShops } from "../api/shop";

export const useReportInformationGetter = (bobaName: string) => {
  const [availableFlavors, setAvailableFlavors] = useState<string[] | null>(
    null
  );
  const [availableShops, setAvailableShops] = useState<ShopDocument[] | null>(
    null
  );
  const [currentBoba, setCurrentBoba] = useState<BobaDocument | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Define function only on mount
  const getBobaReportInformation = useCallback(async (bobaName: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const boba = await getBobaDocumentByName(bobaName);

      if (boba) {
        setCurrentBoba(boba);
      }

      const flavors = await getFlavors();
      setAvailableFlavors(flavors);

      const shops = await getShops();
      setAvailableShops(shops);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Run on mount
  useEffect(
    () => {
      getBobaReportInformation(bobaName);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return {
    availableFlavors,
    availableShops,
    currentBoba,
    isLoading,
    error,
    getBobaReportInformation,
  };
};
