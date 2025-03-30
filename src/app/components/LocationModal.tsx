"use client";

import { useEffect, useState } from "react";
import { useFilterContext } from "../contexts/FilterProvider";
import LocationModalContent from "./LocationModalContent";
import { GooglePlace } from "../types";
import LocationSearchResults from "./LocationSearchResults";
import { getGoogleLocationData } from "../utils/bobaAPI";

const LocationModal = () => {
  const { isLocationModalOpen, setIsLocationModalOpen } = useFilterContext();
  const [dataAndLoading, setDataAndLoading] = useState<{
    data: { city?: string; range?: number } | null;
    loading: boolean;
  }>({ data: null, loading: false });
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [googleSearchResults, setGoogleSearchResults] = useState<GooglePlace[]>(
    []
  );

  useEffect(() => {
    const { data, loading } = dataAndLoading;

    if (data && loading) {
      getGoogleLocationData(data.city, data.range)
        .then((result) => {
          if (result && result.places) {
            setGoogleSearchResults(result.places);
          } else {
            setGoogleSearchResults([]);
          }
          setDataAndLoading({ ...dataAndLoading, data: null, loading: false });
        })
        .catch((error) => {
          console.error("Failed to add search shops:", error);
          setErrorMessage(error.message || "Failed to connect to the server.");
          setDataAndLoading({ ...dataAndLoading, data: null, loading: false });
        });
    }
  }, [dataAndLoading]);

  if (!isLocationModalOpen) return null;

  return (
    <div
      className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center cursor-pointer"
      onClick={() => setIsLocationModalOpen(false)}
    >
      <LocationModalContent setDataAndLoading={setDataAndLoading}>
        <LocationSearchResults
          dataAndLoading={dataAndLoading}
          errorMessage={errorMessage}
          googleSearchResults={googleSearchResults}
        />
      </LocationModalContent>
    </div>
  );
};

export default LocationModal;
