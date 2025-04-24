import axios from "axios";

export const getGooglePlacesDetails = async (placeId: string) => {
  const baseUrl = `https://places.googleapis.com/v1/places/${placeId}`;

  const data = {
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      "X-Goog-FieldMask": "id,displayName",
    },
  };

  try {
    const { data: response } = await axios.get(baseUrl, data);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
    }
    throw error;
  }
};
