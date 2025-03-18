"use client";

import { useEffect, useState } from "react";
import { useFilterContext } from "../contexts/FilterProvider";
import BobaCardsForms from "./BobaCardsForms";
import { addBobaToDatabase } from "../utils/bobaAPI";
import BobaItemCard from "./BobaItemCard";

const BobaCards = () => {
  const { bobaList, fetchBobaList } = useFilterContext();
  const [dataAndLoading, setDataAndLoading] = useState<{
    data: {
      name: string;
      shopId: string;
      flavors: string[];
      sweetnessLevel: "Low" | "Medium" | "High";
    } | null;
    loading: boolean;
  }>({ data: null, loading: false });
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const { data, loading } = dataAndLoading;

    if (data && loading) {
      addBobaToDatabase(data)
        .then((result) => {
          if (!result) {
            throw new Error("Internal Error: Could not add Boba to Database");
          }
          return fetchBobaList();
        })
        .then(() => {
          setDataAndLoading({ ...dataAndLoading, data: null, loading: false });
        })
        .catch((error) => {
          console.error("Failed to add Boba:", error);
          setErrorMessage(error.message || "Failed to connect to the server.");
          setDataAndLoading({ ...dataAndLoading, data: null, loading: false });
        });
    }
  }, [dataAndLoading]);

  if (dataAndLoading.loading) return <div>LOADING</div>;

  return (
    <div className="basis-1/3 display-card">
      {/* <BobaCardsForms setDataAndLoading={setDataAndLoading} /> */}
      {errorMessage && <span>{errorMessage}</span>}
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
