"use client";

import { useState } from "react";
import { useFilterContext } from "../contexts/FilterProvider";
import BobaCardsSortButtons from "./BobaCardsSortButtons";

import BobaItemCard from "./BobaItemCard";
import BobaCardsDistanceToggleButton from "./BobaCardsDistanceToggleButton";

const BobaCards = () => {
  const { bobaList } = useFilterContext();
  const [allowDistance, setAllowDistance] = useState<boolean>(false);
  const [sortedBy, setSortedBy] = useState<string>("Enjoyment");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div className="basis-1/3 display-card">
      <div className="flex w-full justify-between items-center">
        <BobaCardsSortButtons
          allowDistance={allowDistance}
          isLoading={isLoading}
          sortedBy={sortedBy}
          setSortedBy={setSortedBy}
        />
        <h1 className="font-bold text-lg">We Have...</h1>
        <BobaCardsDistanceToggleButton
          allowDistance={allowDistance}
          isLoading={isLoading}
          setAllowDistance={setAllowDistance}
          setIsLoading={setIsLoading}
        />
      </div>
      <div className="flex flex-col gap-2 borderborder-slate-500 p-2 rounded-md inset-shadow-black inset-shadow-xs">
        {bobaList.map((boba) => (
          <BobaItemCard key={boba.name} boba={boba} />
        ))}
      </div>
    </div>
  );
};

export default BobaCards;
