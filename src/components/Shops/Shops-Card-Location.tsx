"use client";

import { cn } from "@/lib/utils/cn";
import { CiSearch } from "react-icons/ci";
import { LuArrowDown10, LuArrowUpDown, LuMapPin, LuStar } from "react-icons/lu";
import SortButton from "./Shops-Card-Location-SortButton";
import { useLocationStore, useShopStore } from "@/lib/zustand/stores";
import { harversine } from "@/lib/utils/harversine";
import EnableLocationButton from "../EnableLocationButton";
import { useState } from "react";

enum SortBy {
  Rating = "Rating",
  Name = "Name",
  Reviews = "Reviews",
  Distance = "Distance",
}

const LocationCard = () => {
  const [minRating, setMinRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [sortedBy, setSortedBy] = useState<SortBy>(SortBy.Rating);

  const shops = useShopStore((state) => state.shops);

  const isLocationEnabled = useLocationStore(
    (state) => state.isLocationEnabled
  );
  const { setIsLocationEnabled, setStoreLocationMap, setUserLocation } =
    useLocationStore();

  const handleEnableLocationClick = () => {
    if (isLocationEnabled) {
      setIsLocationEnabled(false);
      setStoreLocationMap(new Map());
      return;
    }

    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }

    setIsLoading(true);

    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const success = (position: GeolocationPosition) => {
      // Calculate distances from user location to each shop
      const userLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };

      setUserLocation(userLocation);

      const shopDistances: {
        key: string;
        value: number;
      }[] = [];

      shops.forEach((shop) => {
        const distance = harversine(userLocation, {
          latitude: shop.location.latitude,
          longitude: shop.location.longitude,
        });
        shopDistances.push({
          key: shop._id,
          value: distance,
        });
      });

      //Sort shop distances by distance in ascending order and store in map
      shopDistances.sort((a, b) => a.value - b.value);
      const shopDistancesMap = new Map<string, number>();
      shopDistances.forEach((shopDistance) => {
        shopDistancesMap.set(shopDistance.key, shopDistance.value);
      });

      setStoreLocationMap(shopDistancesMap);
      setIsLocationEnabled(true);
      setIsLoading(false);
    };

    const error = (error: GeolocationPositionError) => {
      console.error(error);
      setIsLocationEnabled(false);
      setIsLoading(false);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  return (
    <>
      {/* Title and location toggle */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Where we headin&apos;?</h2>
        <EnableLocationButton
          isLoading={isLoading}
          handleEnableLocationClick={handleEnableLocationClick}
        />
      </div>

      {/* Search bar */}
      <div className="relative">
        <CiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search for a location"
          className={cn("search-input")}
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
              handleOnClick={() => setSortedBy(sortBy)}
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
