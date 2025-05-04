import { cn } from "@/lib/utils";
import { useAuthStore } from "@/lib/zustand/stores";
import { Shop } from "@/types/shop";
import { LuHeart } from "react-icons/lu";

interface DetailsContentProps {
  shop: Shop;
  handleFavorite: () => void;
}

const DetailsContent = ({ shop, handleFavorite }: DetailsContentProps) => {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="flex flex-col gap-2">
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
            <LuHeart className="size-4 text-muted-foreground group-hover:text-pink-500 group-hover:fill-pink-500 transition-all duration-300" />
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
    </div>
  );
};

export default DetailsContent;
