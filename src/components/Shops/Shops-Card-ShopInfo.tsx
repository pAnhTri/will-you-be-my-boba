"use client";

import { useShopStore } from "@/lib/zustand/stores";
import { Shop } from "@/types/shop";
import { useEffect } from "react";
import Item from "./Shops-Card-ShopInfo-Item";

interface ShopInfoProps {
  initialShops: Shop[];
}

const ShopInfo = ({ initialShops }: ShopInfoProps) => {
  const shops = useShopStore((state) => state.shops);
  const displayShops = useShopStore((state) => state.displayShops);
  const selectedShop = useShopStore((state) => state.selectedShop);
  const { setShops, setDisplayShops, setSelectedShop } = useShopStore();

  useEffect(() => {
    setShops(initialShops);
    setDisplayShops(initialShops);
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
