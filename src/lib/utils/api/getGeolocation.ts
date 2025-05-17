import axios from "axios";

export const getGeolocation = async (location: string) => {
  try {
    if (location === "Current Location") {
      const { data } = await axios.get(`http://ip-api.com/json/`);
      return {
        success: true,
        location: {
          latitude: data.lat,
          longitude: data.lon,
        },
      };
    }
    const { data } = await axios.post(`/api/google/geolocation`, {
      location: location.toString(),
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
