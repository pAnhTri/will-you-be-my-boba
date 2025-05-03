import { Shop } from "@/types/shop";
import { harversine } from "./harversine";

export const handleEnableLocationClick = (
  isLocationEnabled: boolean,
  setIsLocationEnabled: (isLocationEnabled: boolean) => void,
  setStoreLocationMap: (storeLocationMap: Map<string, number>) => void,
  setUserLocation: (userLocation: {
    latitude: number;
    longitude: number;
  }) => void,
  setIsLoading: (isLoading: boolean) => void,
  shops: Shop[]
) => {
  if (isLocationEnabled) {
    setIsLocationEnabled(false);
    setStoreLocationMap(new Map());
    return;
  }

  if (!navigator.geolocation) {
    console.error("Geolocation is not supported by this browser.");
    return;
  }

  setIsLoading(true);

  const options: PositionOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const success = (position: GeolocationPosition) => {
    // Calculate distances from user location to each shop
    const userLocation = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };

    setUserLocation(userLocation);

    const shopDistances: {
      key: string;
      value: number;
    }[] = [];

    shops.forEach((shop) => {
      const distance = harversine(userLocation, {
        latitude: shop.location.latitude,
        longitude: shop.location.longitude,
      });
      shopDistances.push({
        key: shop._id,
        value: distance,
      });
    });

    //Sort shop distances by distance in ascending order and store in map
    shopDistances.sort((a, b) => a.value - b.value);
    const shopDistancesMap = new Map<string, number>();
    shopDistances.forEach((shopDistance) => {
      shopDistancesMap.set(shopDistance.key, shopDistance.value);
    });

    setStoreLocationMap(shopDistancesMap);
    setIsLocationEnabled(true);
    setIsLoading(false);
  };

  const error = (error: GeolocationPositionError) => {
    console.error(error);
    setIsLocationEnabled(false);
    setIsLoading(false);
  };

  navigator.geolocation.getCurrentPosition(success, error, options);
};
