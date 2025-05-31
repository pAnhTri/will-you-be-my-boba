import { SearchResult } from "@/types/searchResult";
import { ShopTypeWithDistance } from "@/types/shop";
import { harversine } from "./harversine";

export const formatSearchResultsToShop = (
  searchResults: SearchResult[],
  userLocation: {
    latitude: number;
    longitude: number;
  }
): ShopTypeWithDistance[] => {
  return searchResults.map((result) => {
    const distance = harversine(
      {
        latitude: result.location.latitude,
        longitude: result.location.longitude,
      },
      { latitude: userLocation.latitude, longitude: userLocation.longitude }
    );

    return {
      name: result?.displayName.text || "",
      location: {
        placesId: result?.id || "",
        address: result?.formattedAddress || "",
        latitude: result?.location.latitude || 0,
        longitude: result?.location.longitude || 0,
        city:
          result?.addressComponents.find(
            (component) =>
              component.types.includes("locality") ||
              component.types.includes("sublocality")
          )?.longText || "",
      },
      distance,
    };
  });
};
