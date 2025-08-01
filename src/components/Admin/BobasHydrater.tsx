"use client";

import { useBobasPagination } from "@/lib/utils/hooks";
import { PopulatedBoba } from "@/types";
import { useEffect } from "react";

interface BobasHydraterProps {
  bobas: PopulatedBoba[];
}

const BobasHydrater = ({ bobas }: BobasHydraterProps) => {
  const { mutate } = useBobasPagination("", 20, "name", "asc", "", false);

  useEffect(
    () => {
      mutate([bobas], {
        revalidate: false,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return null;
};

export default BobasHydrater;
