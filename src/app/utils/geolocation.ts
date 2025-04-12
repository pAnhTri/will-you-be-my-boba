export const getGeoLocation = (
  callback: (coordinates: { lat: number; lng: number } | null) => void
) => {
  if (!navigator.geolocation) {
    console.error("This browser does not support geolocation.");
    return null;
  } else {
    const success = (position: GeolocationPosition) => {
      const coordinates = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      callback(coordinates);
    };

    const error = (error: GeolocationPositionError) => {
      console.error(error.message);
      callback(null);
    };

    const options: PositionOptions = {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 10000,
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  }
};

export const calculateDistanceFromCurrentLocation = (
  currentLocation: { lat: number; lng: number },
  destinationLocation: { lat: number; lng: number }
) => {
  const toRadians = (value: number) => (value * Math.PI) / 180;

  const earthRadius = 3959; // In miles

  const deltaLatitude = toRadians(
    destinationLocation.lat - currentLocation.lat
  );
  const deltaLongitude = toRadians(
    destinationLocation.lng - currentLocation.lng
  );

  const latitudeCurrentRadiant = toRadians(currentLocation.lat);
  const latitudeDestinationRadiant = toRadians(destinationLocation.lat);

  const a =
    Math.sin(deltaLatitude / 2) ** 2 +
    Math.cos(latitudeCurrentRadiant) *
      Math.cos(latitudeDestinationRadiant) *
      Math.sin(deltaLongitude / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadius * c;
};
