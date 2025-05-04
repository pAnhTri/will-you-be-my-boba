import { HTMLAttributes } from "react";
import { MenuItem } from "@/types/shop";
import { cn } from "@/lib/utils/cn";
import { LuStar } from "react-icons/lu";

interface MenuCardProps extends HTMLAttributes<HTMLDivElement> {
  item: MenuItem;
}

const MenuCard = ({ item, className, ...props }: MenuCardProps) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-lg border border-gray-200 p-3",
        className
      )}
      {...props}
    >
      {/* Name and Rating */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">{item.name}</h3>
        <div className="flex items-center gap-1">
          <LuStar
            className={cn(
              "size-4",
              item.enjoymentFactor > 4 ? "text-yellow-500" : "text-gray-500"
            )}
          />
          <span>{item.enjoymentFactor.toFixed(2)}</span>
        </div>
      </div>

      {/* Flavor tags */}
      <div className="flex flex-wrap gap-2">
        {item.flavors.map((flavor) => (
          <p
            key={flavor}
            className={`text-xs font-semibold px-2 py-1 rounded-full ring-1 ring-gray-200 bg-gray-50 text-gray-600`}
          >
            {flavor}
          </p>
        ))}
      </div>

      {/* Sweetness */}
      <p className="text-sm text-muted-foreground -mb-2">Sweetness:</p>
      <div className="flex items-center gap-2">
        <div className="h-2 bg-gray-100 w-full rounded-full">
          <div
            className={cn(
              "bg-black h-full rounded-full",
              item.sweetnessLevel === "Low"
                ? "w-1/3"
                : item.sweetnessLevel === "Medium"
                  ? "w-2/3"
                  : "w-full"
            )}
          />
        </div>
        <p className="text-sm">{item.sweetnessLevel}</p>
      </div>
    </div>
  );
};

export default MenuCard;
