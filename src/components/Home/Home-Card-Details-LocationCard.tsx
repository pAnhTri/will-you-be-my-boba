import { useLocationStore, useShopStore } from "@/lib/zustand/stores";
import { Shop } from "@/types/shop";
import { FaMapMarkerAlt } from "react-icons/fa";

interface LocationCardProps {
  shop: Shop;
  handleShopClick: (shop: Shop) => void;
}

const LocationCard = ({ shop, handleShopClick }: LocationCardProps) => {
  const isLocationEnabled = useLocationStore(
    (state) => state.isLocationEnabled
  );
  const storeLocationMap = useLocationStore((state) => state.storeLocationMap);

  const selectedShop = useShopStore((state) => state.selectedShop);
  const isSelected = selectedShop?._id === shop._id;

  return (
    <div
      className={`ring-1 rounded-lg p-2 cursor-pointer transition-colors ${
        isSelected
          ? "ring-pink-200 bg-pink-50"
          : "ring-gray-200 hover:ring-pink-100"
      }`}
      onClick={() => handleShopClick(shop)}
    >
      <div className="flex items-center gap-2">
        <FaMapMarkerAlt
          className={`size-4 ${
            isSelected ? "text-pink-500" : "text-muted-foreground"
          }`}
        />
        <div className="flex justify-between items-center w-full">
          <p
            className={`text-sm ${
              isSelected ? "text-pink-700" : "text-muted-foreground"
            }`}
          >
            {shop.name}
          </p>
          {isLocationEnabled && storeLocationMap.has(shop._id) && (
            <p
              className={`text-sm ${
                isSelected ? "text-pink-600" : "text-muted-foreground"
              }`}
            >
              {storeLocationMap.get(shop._id)?.toFixed(2)} mi away
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
