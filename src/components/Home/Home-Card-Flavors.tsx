"use client";

import { useEffect, useMemo, useState } from "react";
import RandomButton from "./Home-Card-Flavors-Random-Button";
import { CiSearch } from "react-icons/ci";
import { useBobaStore, useFlavorStore } from "@/lib/zustand/stores";
import { GiBoba } from "react-icons/gi";

interface FlavorCardProps {
  initialFlavors: string[];
}

const FlavorCard = ({ initialFlavors }: FlavorCardProps) => {
  const [search, setSearch] = useState<string>("");

  // Use selectors to only subscribe to the state we need
  const flavors = useFlavorStore((state) => state.flavors);
  const selectedFlavors = useFlavorStore((state) => state.selectedFlavors);
  const displayFlavors = useFlavorStore((state) => state.displayFlavors);
  const { setSelectedFlavors, setDisplayFlavors, setFlavors } =
    useFlavorStore();
  const displayBobas = useBobaStore((state) => state.displayBobas);
  const bobas = useBobaStore((state) => state.bobas);
  const { setDisplayBobas } = useBobaStore();

  useEffect(() => {
    setFlavors(initialFlavors);
  }, [initialFlavors]);

  const filteredFlavors = useMemo(() => {
    if (search === "") return flavors;
    return flavors.filter((flavor) =>
      flavor.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, flavors]);

  const updateStates = (newSelectedFlavors: string[]) => {
    // First update the flavors
    setSelectedFlavors(newSelectedFlavors);
    setDisplayFlavors(newSelectedFlavors);

    // Then update bobas based on the new flavors
    const newFilteredBobas =
      newSelectedFlavors.length === 0
        ? bobas
        : bobas.filter((boba) =>
            // A boba should have ALL selected flavors
            newSelectedFlavors.every((flavor) => boba.flavors.includes(flavor))
          );
    setDisplayBobas(newFilteredBobas);
  };

  const handleFlavorClick = (flavor: string) => {
    const newSelectedFlavors = selectedFlavors.includes(flavor)
      ? selectedFlavors.filter((f) => f !== flavor)
      : [...selectedFlavors, flavor];

    updateStates(newSelectedFlavors);
  };

  const handleRandomButtonClick = () => {
    // If no flavors selected, use all initial flavors
    if (selectedFlavors.length === 0) {
      const randomFlavor = flavors[Math.floor(Math.random() * flavors.length)];
      updateStates([randomFlavor]);
      return;
    }

    // If less than 3 flavors selected, find possible combinations
    if (selectedFlavors.length < 3) {
      const uniquePossibleFlavorsSet = new Set<string>();
      displayBobas.forEach((boba) => {
        boba.flavors.forEach((flavor) => {
          if (!selectedFlavors.includes(flavor)) {
            uniquePossibleFlavorsSet.add(flavor);
          }
        });
      });

      const uniquePossibleFlavors = Array.from(uniquePossibleFlavorsSet);
      const randomFlavor =
        uniquePossibleFlavors[
          Math.floor(Math.random() * uniquePossibleFlavors.length)
        ];

      const newSelectedFlavors = [...selectedFlavors, randomFlavor];
      updateStates(newSelectedFlavors);
    }
  };

  if (flavors.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center ring-1 ring-gray-200 rounded-lg p-2 space-y-2">
        <GiBoba className="size-24 text-muted-foreground" />
        <h2 className="text-xl font-semibold text-muted-foreground">
          No flavors found
        </h2>
        <p className="text-sm text-muted-foreground">
          Be the first to add a flavor!
        </p>
      </div>
    );
  }

  return (
    <div className="ring-1 ring-gray-200 rounded-lg p-2 space-y-2">
      {/* Title + random button */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">
          What Flavors Are We Feeling Today?
        </h2>
        <RandomButton onClick={handleRandomButtonClick} />
      </div>

      {/* Search bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search for a flavor"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-8 p-2 rounded-lg border border-gray-300"
        />
        <CiSearch className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
      </div>

      {/* Flavor list */}
      <div className="max-h-[400px] overflow-y-auto">
        <div className="flex flex-wrap gap-2">
          {filteredFlavors.map((flavor) => (
            <button
              key={flavor}
              className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                displayFlavors.includes(flavor)
                  ? "bg-pink-500 text-white border-pink-500 hover:bg-pink-600"
                  : "bg-white text-gray-800 border-gray-300 hover:border-pink-300 hover:bg-pink-50"
              }`}
              onClick={() => handleFlavorClick(flavor)}
            >
              {flavor}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlavorCard;
