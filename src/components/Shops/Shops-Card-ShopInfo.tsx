"use client";

import { useShopStore } from "@/lib/zustand/stores";
import { Shop } from "@/types/shop";
import { useEffect, useState } from "react";
import Item from "./Shops-Card-ShopInfo-Item";
import { getGooglePlacesDetailsByLocation } from "@/lib/utils/api/googplacesapi";

interface ShopInfoProps {
  initialShops: Shop[];
}

const ShopInfo = ({ initialShops }: ShopInfoProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const shops = useShopStore((state) => state.shops);
  const displayShops = useShopStore((state) => state.displayShops);
  const selectedShop = useShopStore((state) => state.selectedShop);

  const { setShops, setDisplayShops, setSelectedShop, setPlacesDetailMap } =
    useShopStore();

  useEffect(() => {
    setShops(initialShops);
    setDisplayShops(initialShops);

    // Fetch google places details for each shop

    // Promise template

    const fetchPromises = initialShops.map((shop) => {
      return getGooglePlacesDetailsByLocation(shop.location.placesId);
    });

    setIsLoading(true);
    setError(null);

    Promise.all(fetchPromises)
      .then((results) => {
        const newPlacesDetailMap = new Map<
          string,
          { rating: number; userRatingCount: number }
        >();
        results.forEach((result) => {
          newPlacesDetailMap.set(result.placeId, {
            rating: result.rating,
            userRatingCount: result.userRatingCount,
          });
        });
        setPlacesDetailMap(newPlacesDetailMap);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [initialShops]);

  const handleShopClick = (shop: Shop) => {
    if (selectedShop?._id === shop._id) {
      setSelectedShop(null);
    } else {
      setSelectedShop(shop);
    }
  };

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {/* Title and number of shops */}
      <div className="flex items-end justify-between">
        <h2 className="text-2xl font-bold">Fancy a store?</h2>
        <p className="text-muted-foreground">{shops.length} shops</p>
      </div>

      {/* Shop items */}
      <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto p-2">
        {displayShops.map((shop) => (
          <Item
            key={shop._id}
            shop={shop}
            onClick={() => handleShopClick(shop)}
            className="flex flex-col gap-2"
          />
        ))}
      </div>
    </>
  );
};

export default ShopInfo;
