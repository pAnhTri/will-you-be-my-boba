"use client";

import { useEffect, useState } from "react";
import { useFilterContext } from "../contexts/FilterProvider";
import LocationModalContent from "./LocationModalContent";
import { GooglePlace } from "../types";
import LocationSearchResults from "./LocationSearchResults";
import { getGoogleLocationData } from "../utils/bobaAPI";
import LocationModealAddLocationButton from "./LocationModealAddLocationButton";

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
  const [selectedGooglePlace, setSelectedGooglePlace] =
    useState<GooglePlace | null>(null);

  useEffect(() => {
    const { data, loading } = dataAndLoading;

    if (data && loading) {
      getGoogleLocationData(data.city, data.range)
        .then((result) => {
          // Reset search
          setSelectedGooglePlace(null);

          if (result && result.places) {
            const places = result.places;

            const keyword = data.city?.toLowerCase();
            const relevantPlaces: GooglePlace[] = [];
            const otherPlaces: GooglePlace[] = [];

            // Sort by (simple) relevance and alphabet descending

            if (keyword) {
              places.map((place) => {
                const placeName = place.displayName.text.toLowerCase();
                if (placeName.includes(keyword)) {
                  relevantPlaces.push(place);
                } else {
                  otherPlaces.push(place);
                }
              });
            }

            let sortedPlaces: GooglePlace[] = [];

            if (relevantPlaces.length > 0 || otherPlaces.length > 0) {
              if (relevantPlaces.length > 1)
                relevantPlaces.sort((a, b) =>
                  a.displayName.text.localeCompare(b.displayName.text)
                );
              if (otherPlaces.length > 1)
                otherPlaces.sort((a, b) =>
                  a.displayName.text.localeCompare(b.displayName.text)
                );
              sortedPlaces = [...relevantPlaces, ...otherPlaces];
            } else {
              sortedPlaces = places.sort((a, b) =>
                a.displayName.text.localeCompare(b.displayName.text)
              );
            }

            setGoogleSearchResults(sortedPlaces);
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
          selectedGooglePlace={selectedGooglePlace}
          setSelectedGooglePlace={setSelectedGooglePlace}
        />
        {selectedGooglePlace && (
          <LocationModealAddLocationButton
            selectedGooglePlace={selectedGooglePlace}
            setErrorMessage={setErrorMessage}
            setIsLocationModalOpen={setIsLocationModalOpen}
            setSelectedGooglePlace={setSelectedGooglePlace}
          />
        )}
      </LocationModalContent>
    </div>
  );
};

export default LocationModal;
