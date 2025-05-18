"use client";

import { Boba } from "@/types/boba";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import SortButton from "./Home-Card-Bobas-SortButton";
import { CiSearch, CiStar } from "react-icons/ci";
import { LuArrowDownUp, LuMapPin } from "react-icons/lu";
import ItemCard from "./Home-Card-Bobas-ItemCard";
import {
  useBobaStore,
  useFlavorStore,
  useShopStore,
  useLocationStore,
  useModalStore,
} from "@/lib/zustand/stores";
import { getClosestShopDistance } from "@/lib/utils";
import AddButton from "./Home-Card-Bobas-AddButton";
import { Shop } from "@/types/shop";

interface BobaCardProps {
  initialBobas: Boba[];
  initialShops: Shop[];
}

const BobaCard = ({ initialBobas, initialShops }: BobaCardProps) => {
  const [sortedBy, setSortedBy] = useState<string>("Rating");

  const bobas = useBobaStore((state) => state.bobas);
  const selectedBoba = useBobaStore((state) => state.selectedBoba);
  const displayBobas = useBobaStore((state) => state.displayBobas);
  const { setBobas, setSelectedBoba, setDisplayBobas } = useBobaStore();

  const shops = useShopStore((state) => state.shops);
  const { setSelectedShop, setIsShowingReviews, setShops } = useShopStore();

  const { selectedFlavors } = useFlavorStore();
  const { setDisplayFlavors } = useFlavorStore();

  const isLocationEnabled = useLocationStore(
    (state) => state.isLocationEnabled
  );
  const maxDistance = useLocationStore((state) => state.maxDistance);
  const storeLocationMap = useLocationStore((state) => state.storeLocationMap);
  const { setMaxDistance } = useLocationStore();

  const { setIsAddBobaModalOpen } = useModalStore();

  useEffect(() => {
    setBobas(initialBobas);
    setDisplayBobas(initialBobas);
    setShops(initialShops);
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

  const handleOnSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const filteredBobas = bobas.filter((boba) => {
      const searchByName = boba.name
        .toLowerCase()
        .includes(value.toLowerCase());
      const searchByShop = boba.shopId.some((shopId) => {
        const shop = shops.find((shop) => shop._id === shopId.toString());
        return (
          shop?.name.toLowerCase().includes(value.toLowerCase()) ||
          shop?.location.city.toLowerCase().includes(value.toLowerCase())
        );
      });

      return searchByName || searchByShop;
    });

    setDisplayBobas(filteredBobas);
  };

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
      case "Distance":
        setDisplayBobas(
          displayBobas.sort((a, b) => {
            const closestShopDistanceA = getClosestShopDistance(
              a.shopId.map((shopId) => shopId.toString()),
              storeLocationMap
            );
            const closestShopDistanceB = getClosestShopDistance(
              b.shopId.map((shopId) => shopId.toString()),
              storeLocationMap
            );
            return closestShopDistanceA - closestShopDistanceB;
          })
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

  const handleAddBobaClick = () => {
    setIsAddBobaModalOpen(true);
  };

  const handleMaxDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMaxDistance = Number(e.target.value);
    setMaxDistance(newMaxDistance);

    // Filter display bobas by max distance
    // If the boba contains a shop that is within the max distance, then keep the boba
    const filteredBobas = bobas.filter((boba) => {
      return boba.shopId.some((shopId) => {
        const distance = storeLocationMap.get(shopId.toString());
        return distance && distance <= newMaxDistance;
      });
    });

    setDisplayBobas(filteredBobas);
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
    <div className="basis-2/3 p-2 space-y-2">
      {/* Title + Add button */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">We have...</h2>
        <AddButton variant="bobas" onClick={handleAddBobaClick} />
      </div>

      {/* Sort buttons + Distance slider*/}
      <h2 className="text-sm text-muted-foreground font-medium">Sort by:</h2>
      <div className="flex flex-wrap md:flex-nowrap gap-2 items-center">
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
        {isLocationEnabled && (
          <>
            <SortButton
              icon={<LuMapPin className="size-4" />}
              label="Distance"
              sortedBy={sortedBy}
              onClick={() => handleSortByClick("Distance")}
            />

            {/* Slider for maximum distance */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <label htmlFor="max-distance">Maximum Distance</label>

                <span className="text-sm">{maxDistance} mi</span>
              </div>
              <input
                id="max-distance"
                type="range"
                step="1"
                min="0"
                max="100"
                className="w-full accent-pink-700 rounded-full"
                value={maxDistance}
                onChange={handleMaxDistanceChange}
              />
            </div>
          </>
        )}
      </div>

      {/* Search bar */}
      <div className="relative flex items-center">
        <CiSearch className="absolute top-1/2 left-2 -translate-y-1/2 size-4 text-gray-400" />
        <input
          type="text"
          className="w-full pl-8 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
          placeholder="Name, Shop, City..."
          onChange={handleOnSearchChange}
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
