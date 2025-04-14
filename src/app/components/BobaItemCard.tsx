import { useMemo } from "react";
import { Boba } from "../types";
import { useFilterContext } from "../contexts/FilterProvider";
import { findShortestShopDistance } from "../utils";

interface BobaItemCardProps {
  boba: Boba;
}

const BobaItemCard = ({ boba }: BobaItemCardProps) => {
  const { selectedBoba, userLocation, shopDistances, setSelectedBoba } =
    useFilterContext();

  const getShopDistance = (
    shopIds: string[],
    shopDistances: Map<string, number>
  ) => {
    const distance = findShortestShopDistance(shopIds, shopDistances);

    return distance === Infinity ? "N/A" : distance.toFixed(2);
  };

  useMemo(() => {
    boba.flavors.sort((a, b) => a.localeCompare(b));
  }, [boba.flavors]);

  return (
    <button
      type="button"
      className={`
        flex items-center shadow-black shadow-xs p-2 rounded-md hover:bg-blue-400 text-start
        ${selectedBoba === boba && "bg-blue-500"}
        `}
      onClick={() => {
        if (selectedBoba === boba) setSelectedBoba(null);
        else setSelectedBoba(boba);
      }}
    >
      {/* Name and Flavor */}
      <div className="flex-1/3">
        <h1 className="font-bold">{boba.name}</h1>
        <h2>{boba.flavors.join(", ")}</h2>
      </div>

      {/* CONDITIONAL Distance */}
      {userLocation && (
        <h1 className="grow-0 text-right mr-3">
          {getShopDistance(boba.shopId, shopDistances as Map<string, number>)}{" "}
          mi
        </h1>
      )}

      {/* Enjoyment Factor */}
      <h1 className="grow-0 text-right ml-3">
        {boba.enjoymentFactor.toFixed(2)}&#11088;
      </h1>
    </button>
  );
};

export default BobaItemCard;
