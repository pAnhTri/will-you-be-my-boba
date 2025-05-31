import { cn } from "@/lib/utils";
import { ShopTypeWithDistance } from "@/types/shop";
import Link from "next/link";
import { HTMLAttributes } from "react";
import { LuMapPin } from "react-icons/lu";

interface AlternativeShopsItemCardProp
  extends HTMLAttributes<HTMLAnchorElement> {
  shop: ShopTypeWithDistance;
}

const AlternativeShopsItemCard = ({
  shop,
  className,
  ...props
}: AlternativeShopsItemCardProp) => {
  return (
    <Link
      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        shop.location.address
      )}&query_place_id=${encodeURIComponent(shop.location.placesId)}`}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex flex-col gap-2 p-3 rounded-lg border border-gray-200 transition-all duration-200 hover:bg-pink-50/50 hover:border-pink-100",
        className
      )}
      {...props}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{shop.name}</h2>
        <span className="text-xs text-gray-500">
          {shop.distance.toFixed(2)} mi away
        </span>
      </div>
      <div className="flex items-center gap-1">
        <LuMapPin className="size-4 text-gray-400 shrink-0" />
        <p className="text-sm text-gray-500">{shop.location.address}</p>
      </div>
    </Link>
  );
};

export default AlternativeShopsItemCard;
