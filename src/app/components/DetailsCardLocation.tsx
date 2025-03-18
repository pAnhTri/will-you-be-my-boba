import { useMemo } from "react";
import { useFilterContext } from "../contexts/FilterProvider";
import { Shop } from "../types";
import Link from "next/link";

interface DetailsCardLocationProps {
  shopId: string[];
}

const DetailsCardLocation = ({ shopId }: DetailsCardLocationProps) => {
  const { shopList } = useFilterContext();

  const shopInfo = useMemo(
    () =>
      (shopId.map((id) => shopList.find((shop) => shop._id === id)) ??
        []) as Shop[],
    [shopId, shopList]
  );

  return (
    <div className="flex flex-col gap-2 border border-slate-500 p-2 rounded-md inset-shadow-black inset-shadow-xs">
      <h1 className="flex w-full justify-center items-center font-bold text-lg">
        You can find it here:
      </h1>
      <div className="flex w-full overflow-x-auto justify-between items-center shadow-black shadow-xs p-2 rounded-md">
        {shopInfo.length > 0 &&
          shopInfo.map((shop) => {
            return (
              <div key={shop._id}>
                <Link
                  href={`https://www.google.com/maps/place/?q=place_id:${shop.location.placesId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-500"
                >
                  {shop.name} ({shop.location.city})
                </Link>
                <div>{shop.location.address}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DetailsCardLocation;
