type Location = {
  latitude: number;
  longitude: number;
};

export const harversine = (userLocation: Location, shopLocation: Location) => {
  const toRadians = (value: number) => (value * Math.PI) / 180;

  const earthRadius = 3959; // In miles

  const deltaLatitude = toRadians(
    shopLocation.latitude - userLocation.latitude
  );
  const deltaLongitude = toRadians(
    shopLocation.longitude - userLocation.longitude
  );

  const latitudeCurrentRadiant = toRadians(userLocation.latitude);
  const latitudeDestinationRadiant = toRadians(shopLocation.latitude);

  const a =
    Math.sin(deltaLatitude / 2) ** 2 +
    Math.cos(latitudeCurrentRadiant) *
      Math.cos(latitudeDestinationRadiant) *
      Math.sin(deltaLongitude / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadius * c;
};
