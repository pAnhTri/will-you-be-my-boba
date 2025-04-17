import Link from "next/link";
import { GooglePlace } from "../types";
import { Dispatch, SetStateAction } from "react";

interface LocationSearchResultsProps {
  dataAndLoading: {
    data: {
      city?: string;
      range?: number;
    } | null;
    loading: boolean;
  };
  errorMessage: string;
  googleSearchResults: GooglePlace[];
  selectedGooglePlace: GooglePlace | null;
  setSelectedGooglePlace: Dispatch<SetStateAction<GooglePlace | null>>;
}

const LocationSearchResults = ({
  dataAndLoading,
  errorMessage,
  googleSearchResults,
  selectedGooglePlace,
  setSelectedGooglePlace,
}: LocationSearchResultsProps) => {
  if (dataAndLoading.loading) return <div>Searching</div>;

  if (errorMessage !== "") return <span>{errorMessage}</span>;

  return (
    <>
      <div className="mb-2">{googleSearchResults.length} search results</div>
      <ul className="flex flex-col overflow-y-scroll border border-black rounded-md">
        {googleSearchResults.map((place) => {
          const cityComponent = place.addressComponents.find((component) => {
            return component.types.includes("locality");
          });
          const city = cityComponent && cityComponent.shortText;
          return (
            <li
              key={place.id}
              className={`flex justify-between px-2 py-1 ${
                selectedGooglePlace === place
                  ? "bg-blue-400"
                  : "bg-slate-300 hover:bg-slate-400 "
              } border-b border-black`}
              onClick={() => {
                setSelectedGooglePlace(
                  place === selectedGooglePlace ? null : place
                );
              }}
            >
              <span>
                {place.displayName.text} {city && `(${city})`}
              </span>
              <Link
                href={`https://www.google.com/maps/place/?q=place_id:${place.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`${
                  selectedGooglePlace === place
                    ? "text-white hover:text-slate-100"
                    : "text-blue-400 hover:text-blue-500"
                }`}
              >
                Show Me
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default LocationSearchResults;
