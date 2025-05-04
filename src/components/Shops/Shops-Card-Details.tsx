"use client";

import { useShopStore } from "@/lib/zustand/stores/shop";
import Blank from "./Shops-Card-Blank";
import DetailsContent from "./Shops-Card-Details-Content";
import { ShopType } from "@/lib/mongodb/models/Shop";
import { useState } from "react";
import { getUser, updateFavoriteShop } from "@/lib/utils/api/user";
import { useAuthStore } from "@/lib/zustand/stores/auth";

interface DetailsProps {
  initialFavoriteShops: (ShopType & { _id: string })[];
}

const Details = ({ initialFavoriteShops }: DetailsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [favoriteShops, setFavoriteShops] =
    useState<(ShopType & { _id: string })[]>(initialFavoriteShops);

  const user = useAuthStore((state) => state.user);

  const selectedShop = useShopStore((state) => state.selectedShop);

  const handleFavorite = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await updateFavoriteShop(
        user?.id ?? "",
        selectedShop?._id ?? "",
        favoriteShops.some(
          (shop) => shop._id.toString() === selectedShop?._id.toString()
        )
          ? "remove"
          : "add"
      );

      // Get the updated user
      const { user: updatedUser } = await getUser(user?.id ?? "");

      setFavoriteShops(updatedUser.favoriteShops);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!selectedShop) {
    return (
      <div className="my-auto">
        <Blank>
          <h2 className="text-xl font-semibold text-muted-foreground">
            Select a Shop
          </h2>
          <p className="text-sm text-muted-foreground">
            Click on any shop from the list to see detailed information
          </p>
        </Blank>
      </div>
    );
  }

  return (
    <div>
      <DetailsContent
        favoriteShops={favoriteShops}
        isLoading={isLoading}
        error={error}
        shop={selectedShop}
        handleFavorite={handleFavorite}
      />
    </div>
  );
};

export default Details;
