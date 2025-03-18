import Link from "next/link";
import { GooglePlace } from "../types";

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
}

const LocationSearchResults = ({
  dataAndLoading,
  errorMessage,
  googleSearchResults,
}: LocationSearchResultsProps) => {
  if (dataAndLoading.loading) return <div>Searching</div>;

  if (errorMessage !== "") return <span>{errorMessage}</span>;

  return (
    <>
      <div>{googleSearchResults.length} search results</div>
      <div className="flex flex-col overflow-y-scroll">
        {googleSearchResults.map((place) => {
          const cityComponent = place.addressComponents.find((component) => {
            return component.types.includes("locality");
          });
          const city = cityComponent && cityComponent.shortText;
          return (
            <div key={place.id} className="flex">
              <span>
                {place.displayName.text} {city && `(${city})`}
              </span>
              <Link
                href={`https://www.google.com/maps/place/?q=place_id:${place.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Link
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default LocationSearchResults;
