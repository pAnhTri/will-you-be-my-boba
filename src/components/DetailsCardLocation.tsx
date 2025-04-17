import { useMemo } from "react";
import { useFilterContext } from "../contexts/FilterProvider";
import { Shop } from "../types";
import Link from "next/link";

interface DetailsCardLocationProps {
  shopId: string[];
  shopDistances: Map<string, number> | undefined;
  userLocation: {
    lat: number;
    lng: number;
  } | null;
}

const DetailsCardLocation = ({
  shopId,
  shopDistances,
  userLocation,
}: DetailsCardLocationProps) => {
  const { shopList } = useFilterContext();

  const shopInfo = useMemo(() => {
    const filteredShopList = (shopId.map((id) =>
      shopList.find((shop) => shop._id === id)
    ) ?? []) as Shop[];

    if (userLocation && shopDistances && shopDistances.size > 2) {
      filteredShopList.sort((a, b) => {
        const shopDistanceA = shopDistances?.get(a._id) ?? Infinity;
        const shopDistanceB = shopDistances?.get(b._id) ?? Infinity;
        return shopDistanceA - shopDistanceB;
      });
    }

    return filteredShopList;
  }, [shopDistances, shopId, shopList, userLocation]);

  return (
    <div className="flex flex-col gap-2 border border-slate-500 p-2 rounded-md inset-shadow-black inset-shadow-xs">
      <h1 className="flex w-full justify-center items-center font-bold text-lg">
        You can find it here:
      </h1>
      <div
        className={`flex w-full overflow-x-auto ${
          shopInfo.length === 1 && "justify-center"
        } items-center shadow-black shadow-xs p-2 rounded-md gap-2`}
      >
        {shopInfo.length > 0 &&
          shopInfo.map((shop) => {
            return (
              <div
                key={shop._id}
                className="border border-black text-sm p-2 rounded-md shrink-0 shadow-2xs shadow-black"
              >
                <Link
                  href={`https://www.google.com/maps/place/?q=place_id:${shop.location.placesId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-500"
                >
                  {shop.name} ({shop.location.city})
                </Link>
                <p>{shop.location.address}</p>
                {userLocation && (
                  <p>{shopDistances?.get(shop._id)?.toFixed(2) ?? "N/A"} mi</p>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DetailsCardLocation;
