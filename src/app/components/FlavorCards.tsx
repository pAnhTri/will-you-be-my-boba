"use client";

import { useEffect, useState } from "react";
import { useFilterContext } from "../contexts/FilterProvider";
import FlavorRandomButton from "./FlavorRandomButton";

const FlavorCards = () => {
  const { bobaList, flavorList, selectedTags, setSelectedTags } =
    useFilterContext();
  const [possibleFlavorCombination, setPossibleFlavorCombination] =
    useState<string[]>(flavorList);

  useEffect(() => {
    if (selectedTags.length === 0) {
      setPossibleFlavorCombination(flavorList);
      return;
    } else if (selectedTags.length < 3) {
      const uniquePossibleFlavorsSet = new Set<string>();
      bobaList.forEach((boba) => {
        boba.flavors.forEach((flavor) => {
          if (!selectedTags.includes(flavor)) {
            uniquePossibleFlavorsSet.add(flavor);
          }
        });
      });

      const uniquePossibleFlavors = Array.from(uniquePossibleFlavorsSet);
      console.log(uniquePossibleFlavors);
      setPossibleFlavorCombination(uniquePossibleFlavors);
    }
  }, [bobaList, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags(
      selectedTags.includes(tag)
        ? selectedTags.filter((t) => t !== tag)
        : [...selectedTags, tag]
    );
  };

  return (
    <div className="basis-1/3 display-card">
      <div className="flex w-full justify-center items-center mb-2 gap-2">
        <h1 className="text-lg font-bold">
          What Flavors Are We Feeling Today?
        </h1>
        <FlavorRandomButton
          possibleFlavorCombination={possibleFlavorCombination}
        />
      </div>
      <div className="sticky top-2 flex max-h-full overflow-y-auto flex-wrap gap-2 border border-slate-500 p-2 rounded-md inset-shadow-black inset-shadow-xs">
        {flavorList.map((tag) => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`p-2 rounded-md border hover:bg-blue-400 ${
              selectedTags.includes(tag)
                ? "bg-blue-500 text-white"
                : "bg-gray-200 shadow-black shadow-xs"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FlavorCards;
