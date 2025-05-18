import axios from "axios";

export const getCurrentLocation = async () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"));
      return;
    }

    const success = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      resolve({
        success: true,
        location: { latitude, longitude },
      });
    };

    const error = (error: GeolocationPositionError) => {
      reject(new Error(error.message));
    };

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  });
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
