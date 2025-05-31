import axios from "axios";

// TODO: PUT THIS INTO A SERVER ACTION TO HIDE THE API KEY
export const getGooglePlacesDetails = async (searchText: string) => {
  const GooglePlaceURL = `https://places.googleapis.com/v1/places:searchText`;

  const searcQuery = `(boba OR tea OR cafe OR milk OR boba tea OR boba shop OR boba cafe) ${
    searchText !== "" ? `AND ${searchText}` : "near me"
  }`;

  const data = {
    textQuery: searcQuery,
  };

  const headers = {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    "X-Goog-FieldMask": [
      "places.id",
      "places.formattedAddress",
      "places.displayName",
      "places.addressComponents",
      "places.location",
    ],
  };

  try {
    const { data: response } = await axios.post(GooglePlaceURL, data, {
      headers,
    });
    return response;
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        `API Error: ${error.response?.status || "Unknown Status"}; Message: ${
          error.response?.data.error.message || "Unknown Message"
        }`
      );
    }
    throw new Error("Something went wrong");
  }
};

export const getGooglePlacesDetailsWithLocationBias = async (
  location: {
    latitude: number;
    longitude: number;
  },
  maxDistance: number
) => {
  const GooglePlaceURL = `https://places.googleapis.com/v1/places:searchText`;

  const searcQuery =
    "(boba OR tea OR cafe OR milk OR boba tea OR boba shop OR boba cafe)";

  const data = {
    textQuery: searcQuery,
    locationBias: {
      circle: {
        center: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
        radius: maxDistance * 1609.34 > 50000 ? 50000 : maxDistance * 1609.34, // Convert miles to meters
      },
    },
  };

  const headers = {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    "X-Goog-FieldMask": [
      "places.id",
      "places.formattedAddress",
      "places.displayName",
      "places.addressComponents",
      "places.location",
    ],
  };

  try {
    const { data: response } = await axios.post(GooglePlaceURL, data, {
      headers,
    });
    return response;
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        `API Error: ${error.response?.status || "Unknown Status"}; Message: ${
          error.response?.data.error.message || "Unknown Message"
        }`
      );
    }
    throw new Error("Something went wrong");
  }
};

export const getGooglePlacesDetailsByLocation = async (placeId: string) => {
  const GooglePlaceURL = `https://places.googleapis.com/v1/places/${placeId}`;

  const headers = {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    "X-Goog-FieldMask": ["rating", "userRatingCount"],
  };

  try {
    const { data: response } = await axios.get(GooglePlaceURL, {
      headers,
    });

    return {
      placeId,
      rating: response.rating,
      userRatingCount: response.userRatingCount,
    };
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        `API Error: ${error.response?.status || "Unknown Status"}; Message: ${
          error.response?.data.error.message || "Unknown Message"
        }`
      );
    }
    throw new Error("Something went wrong");
  }
};
