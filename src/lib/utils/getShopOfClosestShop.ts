export const getShopOfClosestShop = (
  bobaId: string,
  shopDistances: Map<string, number>,
  bobasWithShops: Map<string, { shopName: string; shopId: string }[]>
) => {
  const filteredShops = Array.from(shopDistances.keys()).filter((shopId) =>
    bobasWithShops.get(bobaId)?.some((shop) => shop.shopId === shopId)
  );
  return filteredShops[0];
};
