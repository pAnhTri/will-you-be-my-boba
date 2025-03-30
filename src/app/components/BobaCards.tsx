"use client";

import { useFilterContext } from "../contexts/FilterProvider";

import BobaItemCard from "./BobaItemCard";

const BobaCards = () => {
  const { bobaList } = useFilterContext();

  return (
    <div className="basis-1/3 display-card">
      <h1 className="flex w-full justify-center items-center font-bold text-lg">
        We Have...
      </h1>
      <div className="flex flex-col gap-2 borderborder-slate-500 p-2 rounded-md inset-shadow-black inset-shadow-xs">
        {bobaList.map((boba) => (
          <BobaItemCard key={boba.name} boba={boba} />
        ))}
      </div>
    </div>
  );
};

export default BobaCards;
