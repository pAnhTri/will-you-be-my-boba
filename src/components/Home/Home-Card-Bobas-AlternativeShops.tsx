import { cn } from "@/lib/utils";
import { formatSearchResultsToShop } from "@/lib/utils/formatSearchResultsToShop";
import { getGooglePlacesDetailsWithLocationBias } from "@/lib/utils/api/googplacesapi";
import { useLocationStore } from "@/lib/zustand/stores";
import { ShopTypeWithDistance } from "@/types/shop";
import { HTMLAttributes, useEffect, useState, useRef } from "react";
import { CiCircleAlert } from "react-icons/ci";
import { FiLoader } from "react-icons/fi";
import AlternativeShopsItemCard from "./Home-Card-Bobas-AlternativeShops-ItemCard";

// Cache type definition
type CacheKey = string;
type CacheValue = ShopTypeWithDistance[];

const AlternativeShops = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [alternativeShops, setAlternativeShops] = useState<
    ShopTypeWithDistance[]
  >([]);
  const cache = useRef<Map<CacheKey, CacheValue>>(new Map());

  const userLocation = useLocationStore((state) => state.userLocation);
  const maxDistance = useLocationStore((state) => state.maxDistance);

  useEffect(() => {
    //Reset error and isLoading
    setError(null);
    setIsLoading(true);

    const timeoutId = setTimeout(async () => {
      try {
        // Create a cache key from location and distance
        const cacheKey = `${userLocation?.latitude},${userLocation?.longitude}-${maxDistance}`;

        // Check if we have cached results
        const cachedResults = cache.current.get(cacheKey);
        if (cachedResults) {
          setAlternativeShops(cachedResults);
          setIsLoading(false);
          return;
        }

        // If no cached results, fetch from API
        const alternativeShops = await getGooglePlacesDetailsWithLocationBias(
          userLocation as { latitude: number; longitude: number },
          maxDistance
        );

        // Format the results to ShopTypeWithDistance
        const formattedAlternativeShops = formatSearchResultsToShop(
          alternativeShops.places,
          userLocation as { latitude: number; longitude: number }
        );

        // Sort the results by distance
        formattedAlternativeShops.sort((a, b) => a.distance - b.distance);

        // Store results in cache
        cache.current.set(cacheKey, formattedAlternativeShops);
        setAlternativeShops(formattedAlternativeShops);
      } catch (error) {
        console.error(error);
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    }, 500); // 500ms delay

    return () => clearTimeout(timeoutId);
  }, [userLocation, maxDistance]);

  return (
    <div
      className={cn(
        "rounded-lg border border-gray-200 p-3 space-y-2",
        className
      )}
      {...props}
    >
      {/* Error */}
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md flex items-start gap-2 text-sm">
          <CiCircleAlert className="size-4 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
      <h2 className="text-lg font-semibold">
        ...Nothing in this area yet. But there is:
      </h2>
      {isLoading ? (
        <>
          <FiLoader className="size-4 animate-spin" />
          <span>Getting Location...</span>
        </>
      ) : (
        <div className="flex flex-col gap-2">
          {alternativeShops.length > 0 &&
            alternativeShops.map((shop) => (
              <AlternativeShopsItemCard
                key={shop.location.placesId}
                shop={shop}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default AlternativeShops;
