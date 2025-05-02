export const getClosestShopDistance = (
  shopIds: string[],
  locationStoreMap: Map<string, number>
) => {
  const closestShops = Array.from(locationStoreMap.keys()).filter((shopId) =>
    shopIds.includes(shopId)
  );

  return locationStoreMap.get(closestShops[0]) || Infinity;
};
