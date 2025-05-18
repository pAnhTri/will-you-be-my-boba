import axios from "axios";

export const getCurrentLocation = async () => {
  try {
    const { data } = await axios.get(`http://ip-api.com/json/`);
    return {
      success: true,
      location: { latitude: data.lat, longitude: data.lon },
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

export const getGeolocation = async (location: string) => {
  try {
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
