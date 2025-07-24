"use client";

import { useBobaFlavors } from "@/lib/utils/hooks";
import { useEffect } from "react";

interface BobaFlavorsHydraterProps {
  flavors: string[];
}

const BobaFlavorsHydrater = ({ flavors }: BobaFlavorsHydraterProps) => {
  const { mutate } = useBobaFlavors();

  useEffect(
    () => {
      mutate(flavors, { revalidate: false });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return null;
};

export default BobaFlavorsHydrater;
