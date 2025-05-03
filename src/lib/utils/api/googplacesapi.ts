import axios from "axios";

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
