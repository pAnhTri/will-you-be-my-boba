"use client";

import { useEffect, useMemo, useState } from "react";
import RandomButton from "./Home-Card-Flavors-Random-Button";
import { CiSearch } from "react-icons/ci";
import {
  useBobaStore,
  useFlavorStore,
  useLocationStore,
} from "@/lib/zustand/stores";
import { GiBoba } from "react-icons/gi";
import ResetButton from "./Home-Card-Flavors-Reset-Button";
import { getPossibleFlavors } from "@/lib/utils";
import { Boba } from "@/types/boba";
import FlavorTag from "./Home-Card-Flavors-Tag";

interface FlavorCardProps {
  initialFlavors: string[];
}

const FlavorCard = ({ initialFlavors }: FlavorCardProps) => {
  const [search, setSearch] = useState<string>("");
  const [possibleFlavors, setPossibleFlavors] = useState<string[]>([]);

  // Use selectors to only subscribe to the state we need
  const flavors = useFlavorStore((state) => state.flavors);
  const selectedFlavors = useFlavorStore((state) => state.selectedFlavors);

  const { setSelectedFlavors, setDisplayFlavors, setFlavors } =
    useFlavorStore();
  const bobas = useBobaStore((state) => state.bobas);
  const { setDisplayBobas } = useBobaStore();

  const isLocationEnabled = useLocationStore(
    (state) => state.isLocationEnabled
  );
  const storeLocationMap = useLocationStore((state) => state.storeLocationMap);
  const maxDistance = useLocationStore((state) => state.maxDistance);

  useEffect(() => {
    setFlavors(initialFlavors);
    setPossibleFlavors(initialFlavors);
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

    let newFilteredBobas: Boba[] = bobas;

    // Then update bobas based on the new flavors
    if (isLocationEnabled) {
      // Filter bobas by max distance as base boba list
      const bobasWithMaxDistance = bobas.filter((boba) => {
        return boba.shopId.some((shopId) => {
          const distance = storeLocationMap.get(shopId.toString());
          return distance && distance <= maxDistance;
        });
      });

      newFilteredBobas =
        newSelectedFlavors.length === 0
          ? bobasWithMaxDistance
          : bobasWithMaxDistance.filter((boba) =>
              newSelectedFlavors.every((flavor) =>
                boba.flavors.includes(flavor)
              )
            );
    } else {
      newFilteredBobas =
        newSelectedFlavors.length === 0
          ? bobas
          : bobas.filter((boba) =>
              // A boba should have ALL selected flavors
              newSelectedFlavors.every((flavor) =>
                boba.flavors.includes(flavor)
              )
            );
    }
    setDisplayBobas(newFilteredBobas);

    // Update the possible flavors
    const updatedPossibleFlavors = getPossibleFlavors(
      newFilteredBobas,
      newSelectedFlavors
    );
    setPossibleFlavors(updatedPossibleFlavors);
  };

  const handleFlavorClick = (flavor: string) => {
    const newSelectedFlavors = selectedFlavors.includes(flavor)
      ? selectedFlavors.filter((f) => f !== flavor)
      : [...selectedFlavors, flavor];

    updateStates(newSelectedFlavors);
  };

  const handleResetButtonClick = () => {
    setPossibleFlavors(flavors);
    updateStates([]);
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
      const randomFlavor =
        possibleFlavors[Math.floor(Math.random() * possibleFlavors.length)];

      const newSelectedFlavors = [...selectedFlavors, randomFlavor];

      updateStates(newSelectedFlavors);
    }
  };

  const renderFlavorTags = (filteredFlavors: string[]) => {
    // Extract the base flavors from the tea flavors
    const baseFlavors: string[] = [];
    const teaFlavors: string[] = [];

    filteredFlavors.forEach((flavor) => {
      if (flavor.toLowerCase().includes("tea")) {
        baseFlavors.push(flavor);
      } else {
        teaFlavors.push(flavor);
      }
    });

    // If there are no base flavors, render tea tags as per normal
    if (baseFlavors.length === 0) {
      return teaFlavors.map((flavor) => (
        <FlavorTag
          key={flavor}
          flavor={flavor}
          possibleFlavors={possibleFlavors}
          onClick={() => handleFlavorClick(flavor)}
        />
      ));
    }

    // Render the base and tea tags in two displayFlavors
    return (
      <>
        {/* Base flavors */}
        <div className="border-b border-gray-200 pb-2 mb-2 flex flex-wrap gap-2">
          {baseFlavors.map((flavor) => (
            <FlavorTag
              key={flavor}
              flavor={flavor}
              possibleFlavors={possibleFlavors}
              onClick={() => handleFlavorClick(flavor)}
            />
          ))}
        </div>

        {/* Tea flavors */}
        <div className="flex flex-wrap gap-2">
          {teaFlavors.map((flavor) => (
            <FlavorTag
              key={flavor}
              flavor={flavor}
              possibleFlavors={possibleFlavors}
              onClick={() => handleFlavorClick(flavor)}
            />
          ))}
        </div>
      </>
    );
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
    <div className="basis-1/3 p-2 space-y-2">
      {/* Title + random button */}
      <div className="flex flex-wrap justify-between items-center gap-2">
        <h2 className="text-lg font-bold w-full">
          What Flavors Are We Feeling Today?
        </h2>
        <ResetButton onClick={handleResetButtonClick} />
        <RandomButton onClick={handleRandomButtonClick} />
      </div>

      {/* Search bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search for a flavor"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-8 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <CiSearch className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
      </div>

      {/* Flavor list */}
      <div className="max-h-[400px] overflow-y-auto">
        {renderFlavorTags(filteredFlavors)}
      </div>
    </div>
  );
};

export default FlavorCard;
