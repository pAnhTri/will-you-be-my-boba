import { cn } from "@/lib/utils";
import { HTMLAttributes, useEffect, useMemo, useState } from "react";
import { Boba } from "@/types/boba";
import {
  useAuthStore,
  useLocationStore,
  useShopStore,
} from "@/lib/zustand/stores";
import LocationCard from "./Home-Card-Details-LocationCard";
import { Shop } from "@/types/shop";
import { FiUsers } from "react-icons/fi";
import ReviewSortButton from "./Home-Card-Details-ReviewSortButton";
import { MdAdd } from "react-icons/md";
import AddReviewForm from "./Home-Card-Details-AddReviewForm";
import ReviewCard from "./Home-Card-Details-ReviewCard";
import { compareAsc } from "date-fns";
import { compareDesc } from "date-fns";

interface ItemCardDetailsProps extends HTMLAttributes<HTMLDivElement> {
  boba: Boba;
}

const ItemCardDetails = ({
  boba,
  className,
  ...props
}: ItemCardDetailsProps) => {
  const [sweetnessLevel, setSweetnessLevel] = useState<string>("Medium");
  // Add Review
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reviewsSortedBy, setReviewsSortedBy] = useState<string>("newest");

  const user = useAuthStore((state) => state.user);

  const isLocationEnabled = useLocationStore(
    (state) => state.isLocationEnabled
  );
  const userLocation = useLocationStore((state) => state.userLocation);
  const storeLocationMap = useLocationStore((state) => state.storeLocationMap);

  const shops = useShopStore((state) => state.shops);
  const selectedShop = useShopStore((state) => state.selectedShop);
  const isShowingReviews = useShopStore((state) => state.isShowingReviews);
  const { setSelectedShop, setIsShowingReviews } = useShopStore();

  const reviewByShop = useMemo(() => {
    if (!selectedShop) return boba.communityReviews;
    return boba.communityReviews.filter(
      (review) => review.shopId.toString() === selectedShop._id.toString()
    );
  }, [boba, selectedShop]);

  const sortedReviews = useMemo(() => {
    if (!reviewByShop || reviewByShop.length === 0 || !isShowingReviews)
      return [];

    //Extract the user review if it exsists
    let userReviews = null;
    if (user) {
      userReviews = reviewByShop.filter((review) => review.userId === user.id);
    }

    const reviews = reviewByShop.filter((review) => review.userId !== user?.id);

    switch (reviewsSortedBy) {
      case "newest":
        reviews.sort((a, b) =>
          compareDesc(new Date(a.createdAt), new Date(b.createdAt))
        );
        return userReviews ? [...userReviews, ...reviews] : reviews;
      case "oldest":
        reviews.sort((a, b) =>
          compareAsc(new Date(a.createdAt), new Date(b.createdAt))
        );
        return userReviews ? [...userReviews, ...reviews] : reviews;
      case "highest":
        reviews.sort((a, b) => b.rating - a.rating);
        return userReviews ? [...userReviews, ...reviews] : reviews;
      case "lowest":
        reviews.sort((a, b) => a.rating - b.rating);
        return userReviews ? [...userReviews, ...reviews] : reviews;
      default:
        return userReviews ? [...userReviews, ...reviews] : reviews;
    }
  }, [reviewsSortedBy, boba, isShowingReviews, user, selectedShop]);

  const shopsOfBoba: Shop[] = useMemo(() => {
    if (isLocationEnabled && storeLocationMap.size > 0) {
      //Assume storeIds in map are sorted by distance in ascending order
      const shopIds = Array.from(storeLocationMap.keys()).filter((shopId) =>
        boba.shopId.some((id) => id.toString() === shopId)
      );
      return shopIds.map((shopId) =>
        shops.find((shop) => shop._id === shopId)
      ) as Shop[];
    } else {
      return boba.shopId.map((shopId) =>
        shops.find((shop) => shop._id === shopId.toString())
      ) as Shop[];
    }
  }, [shops, boba, isLocationEnabled, storeLocationMap]);

  const updateSweetnessLevel = (shop: Shop) => {
    const sweetnessOfShop = boba.sweetness.find(
      (sweetness) => sweetness.shopId.toString() === shop._id.toString()
    );
    if (sweetnessOfShop) {
      setSweetnessLevel(sweetnessOfShop.sweetnessLevel);
    }
  };

  useEffect(() => {
    if (isLocationEnabled) {
      // Get the closest shop to the user's location
      const closestShopId = Array.from(storeLocationMap.keys()).find((shopId) =>
        boba.shopId.some((id) => id.toString() === shopId.toString())
      );

      if (closestShopId) {
        const shop = shops.find(
          (s) => s._id.toString() === closestShopId.toString()
        );
        if (shop) {
          setSelectedShop(shop);

          // Set sweetness level
          updateSweetnessLevel(shop);
        }
      }
      return;
    }

    // Select the first shop
    if (shopsOfBoba.length > 0) {
      setSelectedShop(shopsOfBoba[0]);
      // Set sweetness level
      updateSweetnessLevel(shopsOfBoba[0]);
    }
  }, []);

  const handleShopClick = (shop: Shop) => {
    if (selectedShop?._id === shop._id) {
      setSelectedShop(null);
    } else {
      setSelectedShop(shop);

      // Set sweetness level
      const sweetnessOfShop = boba.sweetness.find(
        (sweetness) => sweetness.shopId.toString() === shop._id.toString()
      );
      if (sweetnessOfShop) {
        setSweetnessLevel(sweetnessOfShop.sweetnessLevel);
      }
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row gap-4 p-4 border-t border-black",
        className
      )}
      {...props}
    >
      <div className="flex flex-col md:basis-1/2">
        {/* Shop Cards */}
        <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto p-2">
          {shopsOfBoba.map((shop) => (
            <LocationCard
              key={shop._id}
              shop={shop}
              handleShopClick={handleShopClick}
            />
          ))}
        </div>
        {/* Sweetness */}
        <h2 className="text-lg font-semibold">Sweetness</h2>
        <div className="container flex items-center gap-4">
          <div className="flex-7/8 h-2 bg-gray-100 w-full rounded-full">
            <div
              className={`
                    bg-black
                    h-full rounded-full
                    ${
                      sweetnessLevel === "Low"
                        ? "w-1/3"
                        : sweetnessLevel === "Medium"
                          ? "w-2/3"
                          : "w-full"
                    }
                    transition-all duration-300 ease-in-out
                    `}
            />
          </div>
          <div className="flex-1/8">{sweetnessLevel}</div>
        </div>

        {/*Reviews */}
        <div className="flex justify-center w-full my-4">
          <button
            className="ring-1 ring-gray-200 rounded-lg w-full p-2"
            onClick={() => setIsShowingReviews(!isShowingReviews)}
          >
            {isShowingReviews ? "Hide Reviews" : "Show Reviews"}
          </button>
        </div>

        {/* Community Reviews*/}
        {isShowingReviews && (
          <>
            <div className="flex flex-wrap gap-2 md:flex-nowrap items-center justify-between">
              <div className="flex gap-2 items-center w-full">
                <FiUsers className="size-4 text-pink-500" />
                <h2 className="text-lg font-semibold">Community Reviews</h2>
              </div>

              <ReviewSortButton
                variant={reviewsSortedBy === "newest" ? "newest" : "oldest"}
                reviewsSortedBy={reviewsSortedBy}
                setReviewsSortedBy={setReviewsSortedBy}
              />
              <ReviewSortButton
                variant={reviewsSortedBy === "highest" ? "highest" : "lowest"}
                reviewsSortedBy={reviewsSortedBy}
                setReviewsSortedBy={setReviewsSortedBy}
              />

              {/* Add Review Button */}
              <button
                className={`ring-1 ring-gray-200 rounded-lg p-2 ${
                  isAddingReview ? "ring-pink-500" : ""
                }`}
                onClick={() => setIsAddingReview(!isAddingReview)}
              >
                <MdAdd className="size-4 text-pink-500" />
              </button>
            </div>

            {/* Add Review field */}
            {isAddingReview && (
              <AddReviewForm
                isLoading={isLoading}
                error={error}
                setIsAddingReview={setIsAddingReview}
                setReviewsSortedBy={setReviewsSortedBy}
                setIsLoading={setIsLoading}
                setError={setError}
              />
            )}

            {/* Review Cards */}
            <div className="flex flex-col gap-2 p-2 max-h-[400px] overflow-y-auto">
              {sortedReviews.map((review) => (
                <ReviewCard
                  key={review._id.toString()}
                  review={review}
                  bobaId={boba._id}
                  setReviewsSortedBy={setReviewsSortedBy}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Google Maps iFrame API */}
      <div className="md:basis-1/2 w-full rounded-lg overflow-hidden ring-1 ring-gray-200 h-fit">
        <iframe
          className="w-full h-[300px]"
          style={{ border: "0" }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/place?key=${
            process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
          }&q=${
            selectedShop
              ? encodeURIComponent(`place_id:${selectedShop.location.placesId}`)
              : userLocation
                ? `${userLocation.latitude},${userLocation.longitude}`
                : "here"
          }`}
        ></iframe>
      </div>
    </div>
  );
};

export default ItemCardDetails;
