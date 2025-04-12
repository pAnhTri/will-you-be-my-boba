import { useMemo } from "react";
import { Boba } from "../types";
import { useFilterContext } from "../contexts/FilterProvider";

interface BobaItemCardProps {
  boba: Boba;
}

const BobaItemCard = ({ boba }: BobaItemCardProps) => {
  const { selectedBoba, userLocation, shopDistances, setSelectedBoba } =
    useFilterContext();

  const findShortestDistance = (shopIds: string[]) => {
    let minDistance = Infinity;

    if (!shopDistances) return "N/A";
    else {
      shopIds.forEach((shopId) => {
        minDistance = Math.min(
          minDistance,
          shopDistances.get(shopId) ?? Infinity
        );
      });
    }

    return minDistance.toFixed(2);
  };

  useMemo(() => {
    boba.flavors.sort((a, b) => a.localeCompare(b));
  }, [boba.flavors]);

  return (
    <button
      type="button"
      className={`
        flex justify-between items-center shadow-black shadow-xs p-2 rounded-md hover:bg-blue-400 text-start
        ${selectedBoba === boba && "bg-blue-500"}
        `}
      onClick={() => {
        if (selectedBoba === boba) setSelectedBoba(null);
        else setSelectedBoba(boba);
      }}
    >
      {/* Name and Flavor */}
      <div>
        <h1 className="font-bold">{boba.name}</h1>
        <h2>{boba.flavors.join(", ")}</h2>
      </div>

      {/* CONDITIONAL Distance */}
      {userLocation && <h1>{findShortestDistance(boba.shopId)} mi</h1>}

      {/* Enjoyment Factor */}
      <h1>{boba.enjoymentFactor.toFixed(2)}&#11088;</h1>
    </button>
  );
};

export default BobaItemCard;
