import { Boba } from "@/types/boba";

export const getPossibleFlavors = (
  filteredBobas: Boba[],
  selectedFlavors: string[]
) => {
  const uniquePossibleFlavorsSet = new Set<string>();
  filteredBobas.forEach((boba) => {
    boba.flavors.forEach((flavor) => {
      if (!selectedFlavors.includes(flavor)) {
        uniquePossibleFlavorsSet.add(flavor);
      }
    });
  });

  const uniquePossibleFlavors = Array.from(uniquePossibleFlavorsSet);
  return uniquePossibleFlavors;
};
