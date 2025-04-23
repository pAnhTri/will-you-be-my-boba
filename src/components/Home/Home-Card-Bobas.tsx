"use client";

import { useBobaStore } from "@/lib/zustand/stores/boba";
import { Boba } from "@/types/boba";
import { useEffect } from "react";

interface HomeCardBobasProps {
  initialBobas: Boba[];
}

const BobaCard = ({ initialBobas }: HomeCardBobasProps) => {
  const bobas = useBobaStore((state) => state.bobas);
  const { setBobas } = useBobaStore();

  useEffect(() => {
    setBobas(initialBobas);
    useBobaStore.setState({ initialBobas });
  }, [initialBobas]);

  return (
    <>
      {bobas.length > 0 &&
        bobas.map((boba) => (
          <div key={boba._id}>
            <h3>
              {boba.name}, {boba._id}
            </h3>
          </div>
        ))}
    </>
  );
};

export default BobaCard;
