"use client";

import { cn } from "@/lib/utils/cn";
import { useProfileStore } from "@/lib/zustand/stores";
import { useEffect } from "react";

interface TabSelectorProps {
  initialTab: "reviews" | "favoriteShops";
}

const TabSelector = ({ initialTab }: TabSelectorProps) => {
  const currentTab = useProfileStore((store) => store.currentTab);
  const { setCurrentTab } = useProfileStore();

  useEffect(() => {
    setCurrentTab(initialTab);
  }, [initialTab]);

  return (
    <div className="mx-auto mb-4 flex max-w-sm justify-center items-center gap-4 bg-gray-100 rounded-lg p-2">
      <div
        className={cn(
          "cursor-pointer p-2 bg-white rounded-lg hover:bg-pink-500 hover:text-white transition-all duration-300",
          currentTab === "reviews" && "bg-pink-500 text-white"
        )}
        onClick={() => setCurrentTab("reviews")}
      >
        Reviews
      </div>
      <div
        className={cn(
          "cursor-pointer p-2 bg-white rounded-lg hover:bg-pink-500 hover:text-white transition-all duration-300",
          currentTab === "favoriteShops" && "bg-pink-500 text-white"
        )}
        onClick={() => setCurrentTab("favoriteShops")}
      >
        Favorite Shops
      </div>
    </div>
  );
};

export default TabSelector;
