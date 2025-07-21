"use client";

import { useBobaFlavors } from "@/lib/utils/hooks";
import { useFlavorStore } from "@/lib/zustand/stores";
import { Alert } from "@mantine/core";
import { useEffect } from "react";

interface BobaFlavorsInitiatorProps {
  error: Error | null;
}

const BobaFlavorsInitiator = ({ error }: BobaFlavorsInitiatorProps) => {
  const { flavors } = useBobaFlavors();

  const setFlavors = useFlavorStore((state) => state.setFlavors);
  const setFlavorsError = useFlavorStore((state) => state.setFlavorsError);
  const setIsFlavorsLoading = useFlavorStore(
    (state) => state.setIsFlavorsLoading
  );

  useEffect(
    () => {
      if (flavors) {
        setFlavors(flavors);
      }

      if (error) {
        setFlavorsError(error.message);
      }

      setIsFlavorsLoading(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [flavors, error]
  );

  if (error) {
    return (
      <Alert color="red" title="Error">
        {error.message}
      </Alert>
    );
  }
};

export default BobaFlavorsInitiator;
