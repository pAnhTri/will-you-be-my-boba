"use client";

import { getGooglePlacesDetailsByLocation } from "@/lib/utils/api/googplacesapi";
import { useShopStore } from "@/lib/zustand/stores";
import { useProfileStore } from "@/lib/zustand/stores/profile";
import { useEffect, useState } from "react";
import { CiCircleAlert } from "react-icons/ci";
import { FiLoader } from "react-icons/fi";
import FavoriteShopContent from "./Profile-FavoriteShop-Content";

const FavoriteShops = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userProfile = useProfileStore((state) => state.userProfile);
  const currentTab = useProfileStore((state) => state.currentTab);

  const { setPlacesDetailMap } = useShopStore();

  useEffect(() => {
    if (!userProfile) return;

    // Fetch google places details for each shop

    // Promise template

    const fetchPromises = userProfile.favoriteShops.map((shop) => {
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
  }, [userProfile]);

  if (currentTab !== "favoriteShops") {
    return null;
  }

  if (isLoading) {
    return <FiLoader className="m-auto size-64 animate-spin" />;
  }

  if (userProfile?.favoriteShops.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No favorite shops found
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-3 rounded-md flex items-start gap-2 text-sm">
        <CiCircleAlert className="size-4 mt-0.5 flex-shrink-0" />
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
      {userProfile?.favoriteShops?.map((shop) => (
        <div
          key={shop._id}
          className="bg-white rounded-lg p-4 border-2 border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 break-words"
        >
          <FavoriteShopContent shop={shop} />
        </div>
      ))}
    </div>
  );
};

export default FavoriteShops;
