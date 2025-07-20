"use client";

import { useFlavorStore } from "@/lib/zustand/stores";
import { Text } from "@mantine/core";
import { useEffect } from "react";

interface FlavorInitiatorProps {
  flavors: string[] | null;
  errorMessage: string | null;
}

const FlavorInitiator = ({ flavors, errorMessage }: FlavorInitiatorProps) => {
  const setFlavors = useFlavorStore((state) => state.setFlavors);
  const setIsFlavorsLoading = useFlavorStore(
    (state) => state.setIsFlavorsLoading
  );

  useEffect(
    () => {
      if (flavors) {
        setFlavors(flavors);
      } else {
        setFlavors([]);
      }
      setIsFlavorsLoading(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  if (errorMessage) {
    return <Text c="red">{errorMessage}</Text>;
  }

  return null;
};

export default FlavorInitiator;
