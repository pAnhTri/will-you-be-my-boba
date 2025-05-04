import { ShopType } from "@/lib/mongodb/models/Shop";
import { cn } from "@/lib/utils/cn";
import { useShopStore } from "@/lib/zustand/stores";
import React, { useState } from "react";
import { LuMapPin, LuStar } from "react-icons/lu";
import { LuMap } from "react-icons/lu";

interface FavoriteShopContentProps {
  shop: ShopType & { _id: string };
}

const FavoriteShopContent = ({ shop }: FavoriteShopContentProps) => {
  const [isMapShowing, setIsMapShowing] = useState(false);
  const placesDetailMap = useShopStore((state) => state.placesDetailMap);

  return (
    <>
      {/* Name + Rating*/}
      <div className="flex items-center justify-between">
        <p>{shop.name}</p>

        <div className="flex items-center gap-1">
          <LuStar
            className={cn(
              "size-4",
              (placesDetailMap.get(shop.location.placesId)?.rating || 0) > 4
                ? "text-yellow-500 fill-yellow-500"
                : "text-gray-500 fill-gray-500"
            )}
          />
          <p>{placesDetailMap.get(shop.location.placesId)?.rating || "N/A"}</p>
        </div>
      </div>

      {/* Number of reviews */}

      <p className="text-xs text-gray-500">
        {placesDetailMap.get(shop.location.placesId)?.userRatingCount || "N/A"}
      </p>

      {/* Address */}
      <div className="flex items-center gap-1 mb-4">
        <LuMapPin className="text-gray-500" />
        <p className="text-xs text-gray-500">{shop.location.address}</p>
      </div>

      {/* Map */}
      <button
        className="mx-auto flex items-center justify-center gap-1 group"
        onClick={() => setIsMapShowing(!isMapShowing)}
      >
        <LuMap className="text-gray-500 group-hover:text-pink-500 transition-all duration-300" />
        <p className="text-gray-500 group-hover:text-pink-500 transition-all duration-300">
          {isMapShowing ? "Hide map" : "View on map"}
        </p>
      </button>

      {isMapShowing && (
        <div className="mt-4 w-full rounded-lg overflow-hidden ring-1 ring-gray-200">
          <iframe
            className="w-full h-[300px]"
            style={{ border: "0" }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/place?key=${
              process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
            }&q=${encodeURIComponent(`place_id:${shop.location.placesId}`)}`}
          ></iframe>
        </div>
      )}
    </>
  );
};

export default FavoriteShopContent;
