import { Boba } from "../types";
import { findShortestShopDistance } from "./geolocation";

export const sortByName = (BobaList: Boba[]) => {
  const copyArray = Array.from(BobaList);

  copyArray.sort((a, b) => a.name.localeCompare(b.name));

  return copyArray;
};

export const sortByEnjoyment = (BobaList: Boba[]) => {
  const copyArray = Array.from(BobaList);

  copyArray.sort((a, b) => b.enjoymentFactor - a.enjoymentFactor);

  return copyArray;
};

export const sortByDistance = (
  BobaList: Boba[],
  shopDistances: Map<string, number>
) => {
  const copyArray = Array.from(BobaList);

  copyArray.sort((a, b) => {
    const distanceOfA = findShortestShopDistance(a.shopId, shopDistances);
    const distanceOfB = findShortestShopDistance(b.shopId, shopDistances);

    return distanceOfA - distanceOfB;
  });

  return copyArray;
};
