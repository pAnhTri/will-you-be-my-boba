import { Boba } from "../types";

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
