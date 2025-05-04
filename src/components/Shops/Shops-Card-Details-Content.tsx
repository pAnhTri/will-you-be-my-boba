import { cn } from "@/lib/utils";
import { useAuthStore } from "@/lib/zustand/stores";
import { Shop } from "@/types/shop";
import { LuHeart } from "react-icons/lu";
import MenuCard from "./Shops-Card-Details-Content-MenuCard";
import { FiLoader } from "react-icons/fi";
import { CiCircleAlert } from "react-icons/ci";
import { ShopType } from "@/lib/mongodb/models/Shop";

interface DetailsContentProps {
  favoriteShops: (ShopType & { _id: string })[];
  isLoading: boolean;
  error: string | null;
  shop: Shop;
  handleFavorite: () => void;
}

const DetailsContent = ({
  favoriteShops,
  isLoading,
  error,
  shop,
  handleFavorite,
}: DetailsContentProps) => {
  const user = useAuthStore((state) => state.user);

  const sortedMenu = shop.menu.sort(
    (a, b) => b.enjoymentFactor - a.enjoymentFactor
  );

  return (
    <div className="flex flex-col gap-2">
      {/* Error */}
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md flex items-start gap-2 text-sm">
          <CiCircleAlert className="size-4 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Shop Name and Favorite Button if user is logged in */}
      <div className={cn(user && "flex items-center justify-between")}>
        {/* Shop Name */}
        <h1 className="text-2xl font-bold">{shop.name}</h1>
        {/* Favorite Button */}
        {user && (
          <button
            className="rounded-full border border-gray-300 p-2 hover:bg-gray-100 group"
            onClick={handleFavorite}
          >
            {isLoading ? (
              <FiLoader className="size-4 animate-spin" />
            ) : (
              <LuHeart
                className={cn(
                  "size-4 text-muted-foreground group-hover:text-pink-500 group-hover:fill-pink-500 transition-all duration-300",
                  favoriteShops.some(
                    (favoriteShop) =>
                      favoriteShop._id.toString() === shop._id.toString()
                  ) && "text-pink-500 fill-pink-500"
                )}
              />
            )}
          </button>
        )}
      </div>

      {/* Google Maps iFrame API */}
      <div className="w-full rounded-lg overflow-hidden ring-1 ring-gray-200">
        <iframe
          className="w-full h-[300px]"
          style={{ border: "0" }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/place?key=${
            process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
          }&q=${encodeURIComponent(`place_id:${shop.location.placesId}`)}`}
        ></iframe>
      </div>

      {/* Drink menu */}
      <div>
        <h3 className="text-lg font-bold mb-2">Popular Drinks</h3>
        {sortedMenu.length > 0 ? (
          <div className="flex flex-col p-2 gap-2 max-h-[300px] overflow-y-auto">
            {sortedMenu.map((item) => (
              <MenuCard key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            Seems like there is nothing here... add drinks to your shop!
          </p>
        )}
      </div>
    </div>
  );
};

export default DetailsContent;
