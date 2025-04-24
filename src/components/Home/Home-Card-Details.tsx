"use client";

import {
  useBobaStore,
  useLocationStore,
  useShopStore,
} from "@/lib/zustand/stores";
import { Shop } from "@/types/shop";
import { useEffect, useMemo } from "react";
import { FaStar } from "react-icons/fa";
import { GiBoba } from "react-icons/gi";
import LocationCard from "./Home-Card-Details-LocationCard";
import { FiUsers } from "react-icons/fi";
import { MdAdd } from "react-icons/md";
import ReviewCard from "./Home-Card-Details-ReviewCard";

interface DetailCardProps {
  initialShops: Shop[];
}

const DetailCard = ({ initialShops }: DetailCardProps) => {
  const shops = useShopStore((state) => state.shops);
  const selectedShop = useShopStore((state) => state.selectedShop);
  const isShowingReviews = useShopStore((state) => state.isShowingReviews);
  const { setShops, setSelectedShop, setIsShowingReviews } = useShopStore();

  const selectedBoba = useBobaStore((state) => state.selectedBoba);

  const isLocationEnabled = useLocationStore(
    (state) => state.isLocationEnabled
  );
  const storeLocationMap = useLocationStore((state) => state.storeLocationMap);
  const userLocation = useLocationStore((state) => state.userLocation);

  useEffect(() => {
    setShops(initialShops);
  }, [initialShops]);

  const shopsOfBoba: Shop[] = useMemo(() => {
    if (isLocationEnabled && storeLocationMap.size > 0) {
      //Assume storeIds in map are sorted by distance in ascending order
      const shopIds = Array.from(storeLocationMap.keys()).filter((shopId) =>
        selectedBoba?.shopId.some((id) => id.toString() === shopId)
      );
      return shopIds.map((shopId) =>
        shops.find((shop) => shop._id === shopId)
      ) as Shop[];
    } else {
      return selectedBoba?.shopId.map((shopId) =>
        shops.find((shop) => shop._id === shopId.toString())
      ) as Shop[];
    }
  }, [shops, selectedBoba, isLocationEnabled, storeLocationMap]);

  const handleShopClick = (shop: Shop) => {
    if (selectedShop?._id === shop._id) {
      setSelectedShop(null);
    } else {
      setSelectedShop(shop);
    }
  };

  if (!selectedBoba) {
    return (
      <div className="flex flex-col items-center justify-center ring-1 ring-gray-200 rounded-lg p-2 space-y-2">
        <GiBoba className="size-24 text-muted-foreground" />
        <h2 className="text-xl font-semibold text-muted-foreground">
          Select a boba
        </h2>
        <p className="text-sm text-muted-foreground">
          Click on any boba from the list to see detailed information
        </p>
      </div>
    );
  }

  return (
    <div className="ring-1 ring-gray-200 rounded-lg p-2 space-y-2">
      {/* Boba Name*/}
      <h2 className="text-xl font-bold">{selectedBoba.name}</h2>

      {/* Rating */}
      <div className="flex items-center gap-1">
        <FaStar
          className={`${
            selectedBoba.enjoymentFactor >= 4
              ? "text-yellow-500"
              : "text-gray-400"
          } size-4`}
        />
        <p className="text-sm text-muted-foreground">
          {selectedBoba.enjoymentFactor}
        </p>
        <p className="text-sm text-muted-foreground">
          ({selectedBoba.communityReviews.length} reviews)
        </p>
      </div>

      {/* Flavors */}
      <h2 className="text-lg font-semibold">Flavors</h2>
      <div className="flex overflow-x-auto items-center gap-2">
        {selectedBoba.flavors.map((flavor) => (
          <div
            key={flavor}
            className="text-xs font-semibold text-black bg-gray-100 px-2 py-1 rounded-full"
          >
            {flavor}
          </div>
        ))}
      </div>

      {/* Sweetness */}
      <h2 className="text-lg font-semibold">Sweetness</h2>
      <div className="container flex items-center gap-4">
        <div className="flex-7/8 h-2 bg-gray-100 w-full rounded-full">
          <div
            className={`
                bg-black
                h-full rounded-full
                ${
                  selectedBoba.sweetnessLevel === "Low"
                    ? "w-1/3"
                    : selectedBoba.sweetnessLevel === "Medium"
                    ? "w-2/3"
                    : "w-full"
                }
                transition-all duration-300 ease-in-out
                `}
          />
        </div>
        <div className="flex-1/8">{selectedBoba.sweetnessLevel}</div>
      </div>

      {/* Google Maps iFrame API */}
      <div className="w-full rounded-lg overflow-hidden ring-1 ring-gray-200">
        <iframe
          className="w-full h-[300px]"
          style={{ border: "0" }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/place?key=${
            process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
          }&q=${
            selectedShop
              ? encodeURIComponent(`place_id:${selectedShop.location.placesId}`)
              : `${userLocation?.latitude},${userLocation?.longitude}`
          }`}
        ></iframe>
      </div>

      {/* Shop Cards */}
      <h2 className="text-lg font-semibold">Shops</h2>
      <div className="flex flex-col gap-2">
        {shopsOfBoba.map((shop) => (
          <LocationCard
            key={shop._id}
            shop={shop}
            handleShopClick={handleShopClick}
          />
        ))}
      </div>

      {/*Reviews */}
      <div className="flex justify-center w-full my-4">
        <button
          className="ring-1 ring-gray-200 rounded-lg w-full p-2"
          onClick={() => setIsShowingReviews(!isShowingReviews)}
        >
          {isShowingReviews ? "Hide Reviews" : "Show Reviews"}
        </button>
      </div>

      {/* Community Reviews*/}
      {isShowingReviews && (
        <>
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <FiUsers className="size-4 text-pink-500" />
              <h2 className="text-lg font-semibold">Community Reviews</h2>
            </div>

            {/* Add Review Button */}
            <button className="ring-1 ring-gray-200 rounded-lg  p-2">
              <MdAdd className="size-4 text-pink-500" />
            </button>
          </div>

          {/* Review Cards */}
          <div className="flex flex-col gap-2 p-2 max-h-[400px] overflow-y-auto">
            {selectedBoba.communityReviews.map((review) => (
              <ReviewCard key={review.userName} review={review} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DetailCard;
