import { cn, getShopOfClosestShop } from "@/lib/utils";
import {
  useBobaStore,
  useFlavorStore,
  useLocationStore,
} from "@/lib/zustand/stores";
import { Boba } from "@/types/boba";
import { JSX } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { LuMapPin } from "react-icons/lu";
import ItemCardDetails from "./Home-Card-Bobas-ItemCard-Details";

interface ItemCardProps {
  boba: Boba;
  bobasWithShops: Map<string, { shopName: string; shopId: string }[]>;
  onClick: () => void;
}

const ItemCard = ({ boba, bobasWithShops, onClick }: ItemCardProps) => {
  const { selectedBoba } = useBobaStore();
  const { displayFlavors } = useFlavorStore();

  const shopDistances = useLocationStore((state) => state.storeLocationMap);
  const isLocationEnabled = useLocationStore(
    (state) => state.isLocationEnabled
  );

  const renderLocations = (): JSX.Element | JSX.Element[] => {
    if (isLocationEnabled && shopDistances.size > 0) {
      // Distances are stored in ascending order

      const shopName =
        bobasWithShops
          .get(boba._id)
          ?.find(
            (shop) =>
              shop.shopId ===
              getShopOfClosestShop(boba._id, shopDistances, bobasWithShops)
          )?.shopName ?? "N/A";

      const shopCount = bobasWithShops.get(boba._id)?.length ?? 0;

      return (
        <div className="flex flex-row items-center gap-2">
          <p className="text-xs text-gray-600 whitespace-nowrap">
            {shopDistances
              .get(
                getShopOfClosestShop(boba._id, shopDistances, bobasWithShops)
              )
              ?.toFixed(2)}{" "}
            mi away
          </p>
          <div>
            <p className="text-xs text-gray-600 whitespace-nowrap">
              {shopName}
            </p>
            {shopCount > 1 && (
              <p className="text-xs text-gray-600 whitespace-nowrap">
                + {shopCount - 1} more
              </p>
            )}
          </div>
        </div>
      );
    } else {
      const shopNames =
        bobasWithShops.get(boba._id)?.map((shop) => shop.shopName) ?? [];

      const shopNamesToRender = shopNames.slice(0, 3).join(", "); // Only render first 3 shop names

      return (
        <>
          <p className="text-xs text-gray-600 whitespace-nowrap">
            {shopNamesToRender}
          </p>
          {shopNames.length > 3 && (
            <p className="text-xs text-gray-600 whitespace-nowrap">
              + {shopNames.length - 3} more
            </p>
          )}
        </>
      );
    }
  };

  return (
    <>
      <div
        className={`container rounded-lg border border-gray-200 p-3 transition-all duration-200 cursor-pointer ${
          selectedBoba?._id === boba._id
            ? "bg-pink-50 border-pink-200"
            : "hover:bg-pink-50/50 hover:border-pink-100"
        }`}
        onClick={onClick}
      >
        <div className="rounded-lg p-2 space-y-2">
          {/* Name + Rating */}
          <div className="flex justify-between items-center">
            <p>{boba.name}</p>
            <div className="flex items-center gap-1">
              {selectedBoba?._id === boba._id ? (
                <FaStar
                  className={`${
                    boba.enjoymentFactor >= 4
                      ? "text-yellow-500"
                      : "text-gray-400"
                  } size-4`}
                />
              ) : (
                <FaRegStar
                  className={`${
                    boba.enjoymentFactor >= 4
                      ? "text-yellow-500"
                      : "text-gray-400"
                  } size-4`}
                />
              )}
              <p className="text-sm">{boba.enjoymentFactor.toFixed(2)}</p>
            </div>
          </div>

          {/* Flavor tags */}
          <div className="flex flex-wrap gap-2">
            {boba.flavors.map((flavor) => (
              <p
                key={flavor}
                className={`text-xs font-semibold px-2 py-1 rounded-full ring-1 ring-gray-200 ${
                  displayFlavors.includes(flavor)
                    ? "bg-pink-50 text-pink-600 ring-pink-200"
                    : "bg-gray-50 text-gray-600 ring-gray-200"
                }`}
              >
                {flavor}
              </p>
            ))}
          </div>

          {/* Location */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
            <LuMapPin className="size-4 text-gray-400 shrink-0" />
            <div
              className={`flex container gap-1 ${
                isLocationEnabled && shopDistances.size > 0
                  ? "justify-between"
                  : "justify-start"
              }`}
            >
              {renderLocations()}
            </div>
          </div>
        </div>
      </div>
      <div
        className={cn(
          "overflow-hidden transition-all duration-200",
          selectedBoba?._id === boba._id ? "max-h-[1000px]" : "max-h-0"
        )}
      >
        {selectedBoba?._id === boba._id && <ItemCardDetails boba={boba} />}
      </div>
    </>
  );
};
export default ItemCard;
