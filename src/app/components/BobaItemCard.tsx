import { useMemo } from "react";
import { Boba } from "../types";
import { useFilterContext } from "../contexts/FilterProvider";

interface BobaItemCardProps {
  boba: Boba;
}

const BobaItemCard = ({ boba }: BobaItemCardProps) => {
  const { selectedBoba, setSelectedBoba } = useFilterContext();

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
      <h1>{boba.enjoymentFactor.toFixed(2)}&#11088;</h1>
    </button>
  );
};

export default BobaItemCard;
