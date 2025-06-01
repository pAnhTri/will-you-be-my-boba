import axios from "axios";

// TODO: PUT THIS INTO A SERVER ACTION TO HIDE THE API KEY
export const getGooglePlacesDetails = async (searchText: string) => {
  try {
    const { data } = await axios.post("/api/google/places", {
      searchText,
    });
    return data;
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
  try {
    const { data: response } = await axios.post("/api/google/places/bias", {
      location,
      maxDistance,
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
  try {
    const { data: response } = await axios.post(`/api/google/places/location`, {
      placeId,
    });

    return {
      placeId,
      rating: response.place.rating,
      userRatingCount: response.place.userRatingCount,
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
