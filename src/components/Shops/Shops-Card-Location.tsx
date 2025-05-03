"use client";

import { cn } from "@/lib/utils/cn";
import { CiSearch } from "react-icons/ci";
import { LuArrowDown10, LuArrowUpDown, LuMapPin, LuStar } from "react-icons/lu";
import SortButton from "./Shops-Card-Location-SortButton";
import { useLocationStore, useShopStore } from "@/lib/zustand/stores";
import EnableLocationButton from "../EnableLocationButton";
import { useState } from "react";
import { Shop } from "@/types/shop";
import { handleEnableLocationClick } from "@/lib/utils/handleEnableLocationClick";

enum SortBy {
  Rating = "Rating",
  Name = "Name",
  Reviews = "Reviews",
  Distance = "Distance",
}

const LocationCard = () => {
  const [minRating, setMinRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [sortedBy, setSortedBy] = useState<SortBy>(SortBy.Name);

  const shops = useShopStore((state) => state.shops);
  const displayShops = useShopStore((state) => state.displayShops);
  const { setDisplayShops } = useShopStore();

  const storeLocationMap = useLocationStore((state) => state.storeLocationMap);
  const isLocationEnabled = useLocationStore(
    (state) => state.isLocationEnabled
  );
  const { setIsLocationEnabled, setStoreLocationMap, setUserLocation } =
    useLocationStore();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;

    // Search for shops by name or address
    const filteredShops = shops.filter((shop) => {
      return (
        shop.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        shop.location.address.toLowerCase().includes(searchValue.toLowerCase())
      );
    });

    setDisplayShops(filteredShops);
  };

  const handleSortClick = (sortedBy: SortBy) => {
    setSortedBy(sortedBy);

    const copyDisplayShops = displayShops;

    // Sort shops by selected criteria
    switch (sortedBy) {
      case SortBy.Name:
        copyDisplayShops.sort((a, b) => a.name.localeCompare(b.name));
        setDisplayShops(copyDisplayShops);
        break;
      case SortBy.Rating:
        console.log("WIP");
        break;
      case SortBy.Reviews:
        console.log("WIP");
        break;
      case SortBy.Distance:
        const sortedShops = Array.from(storeLocationMap.keys()).map(
          (key) => shops.find((shop) => shop._id === key) as Shop
        );
        setDisplayShops(sortedShops);
        break;
    }
  };

  return (
    <>
      {/* Title and location toggle */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Where we headin&apos;?</h2>
        <EnableLocationButton
          isLoading={isLoading}
          handleEnableLocationClick={() =>
            handleEnableLocationClick(
              isLocationEnabled,
              setIsLocationEnabled,
              setStoreLocationMap,
              setUserLocation,
              setIsLoading,
              shops
            )
          }
        />
      </div>

      {/* Search bar */}
      <div className="relative">
        <CiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search for a location"
          className={cn("search-input")}
          onChange={handleSearchChange}
        />
      </div>

      {/* Slider for minimum rating */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <label htmlFor="min-rating">Minimum Rating</label>
          <div className="flex items-center gap-1 bg-pink-100 rounded-full px-2 text-pink-700">
            <LuStar className="size-3 fill-current" />
            <span className="text-sm">{minRating}</span>
          </div>
        </div>
        <input
          id="min-rating"
          type="range"
          step="0.1"
          min="0"
          max="5"
          className="w-full accent-pink-700 rounded-full"
          value={minRating}
          onChange={(e) => setMinRating(Number(e.target.value))}
        />
      </div>

      {/* Sort by */}
      <div className="flex flex-col gap-2">
        <span>Sort by:</span>
        {Array.from(Object.values(SortBy)).map((sortBy) => {
          if (sortBy === SortBy.Distance && !isLocationEnabled) {
            return null;
          }
          return (
            <SortButton
              key={sortBy}
              sortedBy={sortBy}
              className={cn(
                sortedBy === sortBy && "bg-pink-500 text-white",
                "transition-all duration-300"
              )}
              handleOnClick={() => handleSortClick(sortBy)}
            >
              <div className="flex items-center gap-1">
                {sortBy === SortBy.Distance && <LuMapPin className="size-4" />}
                {sortBy === SortBy.Name && <LuArrowUpDown className="size-4" />}
                {sortBy === SortBy.Rating && <LuStar className="size-4" />}
                {sortBy === SortBy.Reviews && (
                  <LuArrowDown10 className="size-4" />
                )}
                <span>{sortBy}</span>
              </div>
            </SortButton>
          );
        })}
      </div>
    </>
  );
};

export default LocationCard;
