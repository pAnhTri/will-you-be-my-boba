import { cn } from "@/lib/utils/cn";
import { useLocationStore, useShopStore } from "@/lib/zustand/stores";
import { Shop } from "@/types/shop";
import { HTMLAttributes } from "react";
import { LuMapPin, LuStar } from "react-icons/lu";

interface ItemProps extends HTMLAttributes<HTMLDivElement> {
  shop: Shop;
}

const Item = ({ shop, className, onClick, ...props }: ItemProps) => {
  const selectedShop = useShopStore((state) => state.selectedShop);

  const isLocationEnabled = useLocationStore(
    (state) => state.isLocationEnabled
  );
  const storeLocationMap = useLocationStore((state) => state.storeLocationMap);

  return (
    <div
      className={cn(
        "container rounded-lg border border-gray-200 p-3 transition-all duration-200 cursor-pointer",
        className,
        selectedShop?._id === shop._id
          ? "bg-pink-50 border-pink-200"
          : "hover:bg-pink-50/50 hover:border-pink-100"
      )}
      onClick={onClick}
      {...props}
    >
      {/* Name + Rating*/}
      <div className="flex items-center justify-between">
        <p>{shop.name}</p>
        <div className="flex items-center gap-1">
          {/* WIP Rating */}
          <LuStar className="text-yellow-500" />
          <p>WIP</p>
        </div>
      </div>

      {/* Number of reviews */}
      <p className="text-xs text-gray-500">WIP reviews</p>

      {/* Address */}
      <div className="flex items-center gap-1">
        <LuMapPin className="text-gray-500" />
        <p className="text-xs text-gray-500">{shop.location.address}</p>
      </div>

      {/* Distance */}
      {isLocationEnabled && (
        <p className="text-xs text-gray-500">
          {storeLocationMap.get(shop._id)?.toFixed(2) || "N/A"} miles away
        </p>
      )}
    </div>
  );
};

export default Item;
