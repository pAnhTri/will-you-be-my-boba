"use client";

import { useShopStore } from "@/lib/zustand/stores/shop";
import Blank from "./Shops-Card-Blank";
import DetailsContent from "./Shops-Card-Details-Content";

const Details = () => {
  const selectedShop = useShopStore((state) => state.selectedShop);

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
      <DetailsContent shop={selectedShop} handleFavorite={() => {}} />
    </div>
  );
};

export default Details;
