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
      <div
        className={`flex w-full ${
          bobaList.length > 0 ? "justify-between" : "justify-center"
        } items-center`}
      >
        {bobaList.length > 0 && (
          <BobaCardsSortButtons
            allowDistance={allowDistance}
            isLoading={isLoading}
            sortedBy={sortedBy}
            setSortedBy={setSortedBy}
          />
        )}
        <h1 className="font-bold text-lg">We Have...</h1>
        {bobaList.length > 0 && (
          <BobaCardsDistanceToggleButton
            allowDistance={allowDistance}
            isLoading={isLoading}
            setAllowDistance={setAllowDistance}
            setIsLoading={setIsLoading}
          />
        )}
      </div>
      {
        <div className="flex flex-col gap-2 borderborder-slate-500 p-2 rounded-md inset-shadow-black inset-shadow-xs">
          {bobaList.length > 0 ? (
            bobaList.map((boba) => <BobaItemCard key={boba.name} boba={boba} />)
          ) : (
            <h2>
              Nothing yet!
              <br />
              Use the + button on the bottom right to add the first Boba!
            </h2>
          )}
        </div>
      }
    </div>
  );
};

export default BobaCards;
