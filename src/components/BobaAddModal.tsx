"use client";

import React, { useEffect, useState } from "react";
import { useFilterContext } from "../contexts/FilterProvider";
import BobaAddButton from "./BobaAddButton";
import BobaCardsForms from "./BobaCardsForms";
import { addBobaToDatabase } from "../lib/utils/bobaAPI";

const BobaAddModal = () => {
  const { isBobaAddModalOpen, setIsBobaAddModalOpen, fetchBobaList } =
    useFilterContext();
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
          setIsBobaAddModalOpen(false);
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
    <>
      <BobaAddButton setIsBobaAddModalOpen={setIsBobaAddModalOpen} />
      {isBobaAddModalOpen && (
        <div
          className="fixed top-0 left-0 z-25 w-full h-full bg-black/85 flex items-center justify-center cursor-pointer"
          onClick={() => setIsBobaAddModalOpen(false)}
        >
          {dataAndLoading.loading ? (
            <div>LOADING</div>
          ) : (
            <>
              <BobaCardsForms setDataAndLoading={setDataAndLoading} />
              {errorMessage && <span>{errorMessage}</span>}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default BobaAddModal;
