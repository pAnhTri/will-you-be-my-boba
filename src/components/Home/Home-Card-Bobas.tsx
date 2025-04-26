"use client";

import { Boba } from "@/types/boba";
import { useEffect, useMemo, useState } from "react";
import EnableLocationButton from "./Home-Card-Bobas-EnableLocationButton";
import SortButton from "./Home-Card-Bobas-SortButton";
import { CiStar } from "react-icons/ci";
import { LuArrowDownUp, LuMapPin } from "react-icons/lu";
import ItemCard from "./Home-Card-Bobas-ItemCard";
import {
  useBobaStore,
  useFlavorStore,
  useShopStore,
  useLocationStore,
  useModalStore,
} from "@/lib/zustand/stores";
import { harversine } from "@/lib/utils";
import AddButton from "./Home-Card-Bobas-AddButton";

interface BobaCardProps {
  initialBobas: Boba[];
}

const BobaCard = ({ initialBobas }: BobaCardProps) => {
  const [sortedBy, setSortedBy] = useState<string>("Rating");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const bobas = useBobaStore((state) => state.bobas);
  const selectedBoba = useBobaStore((state) => state.selectedBoba);
  const displayBobas = useBobaStore((state) => state.displayBobas);
  const { setBobas, setSelectedBoba, setDisplayBobas } = useBobaStore();

  const shops = useShopStore((state) => state.shops);
  const { setSelectedShop, setIsShowingReviews } = useShopStore();

  const { selectedFlavors } = useFlavorStore();
  const { setDisplayFlavors } = useFlavorStore();

  const isLocationEnabled = useLocationStore(
    (state) => state.isLocationEnabled
  );
  const { setIsLocationEnabled, setStoreLocationMap, setUserLocation } =
    useLocationStore();

  const { setIsAddBobaModalOpen } = useModalStore();

  useEffect(() => {
    setBobas(initialBobas);
    setDisplayBobas(initialBobas);
  }, [initialBobas]);

  const bobasWithShops: Map<string, { shopName: string; shopId: string }[]> =
    useMemo(() => {
      if (bobas.length === 0) return new Map();
      const bobaShopMap = new Map<
        string,
        { shopName: string; shopId: string }[]
      >();

      bobas.forEach((boba) => {
        const shopEntries: { shopName: string; shopId: string }[] = [];
        boba.shopId.forEach((shopId) => {
          const shop = shops.find((shop) => shop._id === shopId.toString());
          if (shop) {
            shopEntries.push({ shopName: shop.name, shopId: shop._id });
          }
        });
        bobaShopMap.set(boba._id, shopEntries);
      });

      return bobaShopMap;
    }, [bobas, shops]);

  const handleSortByClick = (newSortedBy: string) => {
    setSortedBy(newSortedBy);

    switch (newSortedBy) {
      case "Rating":
        setDisplayBobas(
          displayBobas.sort((a, b) => b.enjoymentFactor - a.enjoymentFactor)
        );
        break;
      case "Name":
        setDisplayBobas(
          displayBobas.sort((a, b) => a.name.localeCompare(b.name))
        );
        break;
    }
  };

  const handleItemCardClick = (boba: Boba) => {
    if (selectedBoba?._id === boba._id) {
      setSelectedBoba(null);
      setDisplayFlavors(selectedFlavors);
    } else {
      setSelectedBoba(boba);
      setDisplayFlavors(boba.flavors);
    }

    setSelectedShop(null);
    setIsShowingReviews(false);
  };

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

  const handleAddBobaClick = () => {
    setIsAddBobaModalOpen(true);
  };

  if (bobas.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center ring-1 ring-gray-200 rounded-lg p-2 space-y-2">
        <AddButton variant="no-bobas" onClick={handleAddBobaClick} />
        <h2 className="text-xl font-semibold text-muted-foreground">
          No bobas found
        </h2>
        <p className="text-sm text-muted-foreground">
          Be the first to add a boba!
        </p>
      </div>
    );
  }

  return (
    <div className="ring-1 ring-gray-200 rounded-lg p-2 space-y-2">
      {/* Title + Add button */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">We have...</h2>
        <AddButton variant="bobas" onClick={handleAddBobaClick} />
      </div>

      {/* Sort buttons */}
      <h2 className="text-sm text-muted-foreground font-medium">Sort by:</h2>
      <div className="flex justify-between items-center">
        <SortButton
          icon={<CiStar className="size-4" />}
          label="Rating"
          sortedBy={sortedBy}
          onClick={() => handleSortByClick("Rating")}
        />
        <SortButton
          icon={<LuArrowDownUp className="size-4" />}
          label="Name"
          sortedBy={sortedBy}
          onClick={() => handleSortByClick("Name")}
        />
        {isLocationEnabled ? (
          <SortButton
            icon={<LuMapPin className="size-4" />}
            label="Distance"
            sortedBy={sortedBy}
            onClick={() => handleSortByClick("Distance")}
          />
        ) : (
          <div className="w-10 h-4" />
        )}
        {/* WIP Enable location */}
        <EnableLocationButton
          isLoading={isLoading}
          handleEnableLocationClick={handleEnableLocationClick}
        />
      </div>

      {/* Item cards */}
      <div className="max-h-[400px] overflow-y-auto p-2 space-y-2">
        {displayBobas.map((boba) => (
          <ItemCard
            key={boba._id}
            boba={boba}
            bobasWithShops={bobasWithShops}
            onClick={() => handleItemCardClick(boba)}
          />
        ))}
      </div>
    </div>
  );
};

export default BobaCard;
