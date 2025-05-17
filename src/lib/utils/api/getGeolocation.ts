import axios from "axios";

export const getGeolocation = async (location: string) => {
  if (location === "Current Location") {
    return new Promise((resolve, reject) => {
      const success = (position: GeolocationPosition) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        resolve({
          success: true,
          location: {
            latitude,
            longitude,
          },
        });
      };

      const error = (error: GeolocationPositionError) => {
        console.error(error);
        reject(new Error("Error getting current location"));
      };

      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      navigator.geolocation.getCurrentPosition(success, error, options);
    });
  }

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
