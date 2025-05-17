"use client";

import {
  useAuthStore,
  useBobaStore,
  useLocationStore,
  useShopStore,
} from "@/lib/zustand/stores";
import { Shop } from "@/types/shop";
import { useEffect, useMemo, useState } from "react";
import { FaStar } from "react-icons/fa";
import { GiBoba } from "react-icons/gi";
import LocationCard from "./Home-Card-Details-LocationCard";
import { FiUsers } from "react-icons/fi";
import { MdAdd } from "react-icons/md";
import ReviewCard from "./Home-Card-Details-ReviewCard";
import AddReviewForm from "./Home-Card-Details-AddReviewForm";
import { compareAsc, compareDesc } from "date-fns";
import ReviewSortButton from "./Home-Card-Details-ReviewSortButton";

interface DetailCardProps {
  initialShops: Shop[];
}

const DetailCard = ({ initialShops }: DetailCardProps) => {
  // Add Review
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reviewsSortedBy, setReviewsSortedBy] = useState<string>("newest");

  const shops = useShopStore((state) => state.shops);
  const selectedShop = useShopStore((state) => state.selectedShop);
  const isShowingReviews = useShopStore((state) => state.isShowingReviews);
  const { setShops, setSelectedShop, setIsShowingReviews } = useShopStore();

  const selectedBoba = useBobaStore((state) => state.selectedBoba);

  const isLocationEnabled = useLocationStore(
    (state) => state.isLocationEnabled
  );
  const storeLocationMap = useLocationStore((state) => state.storeLocationMap);
  const userLocation = useLocationStore((state) => state.userLocation);

  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    setShops(initialShops);
  }, [initialShops]);

  const hasUserReviewed = useMemo(() => {
    if (!selectedBoba) return false;
    return selectedBoba.communityReviews.some(
      (review) => review.userId === user?.id
    );
  }, [selectedBoba, user]);

  const sortedReviews = useMemo(() => {
    if (
      !selectedBoba ||
      selectedBoba.communityReviews.length === 0 ||
      !isShowingReviews
    )
      return [];

    //Extract the user review if it exsists
    let userReview = null;
    if (user) {
      userReview = selectedBoba.communityReviews.find(
        (review) => review.userId === user.id
      );
    }

    const reviews = selectedBoba.communityReviews.filter(
      (review) => review.userId !== user?.id
    );

    switch (reviewsSortedBy) {
      case "newest":
        reviews.sort((a, b) =>
          compareDesc(new Date(a.createdAt), new Date(b.createdAt))
        );
        return userReview ? [userReview, ...reviews] : reviews;
      case "oldest":
        reviews.sort((a, b) =>
          compareAsc(new Date(a.createdAt), new Date(b.createdAt))
        );
        return userReview ? [userReview, ...reviews] : reviews;
      case "highest":
        reviews.sort((a, b) => b.rating - a.rating);
        return userReview ? [userReview, ...reviews] : reviews;
      case "lowest":
        reviews.sort((a, b) => a.rating - b.rating);
        return userReview ? [userReview, ...reviews] : reviews;
      default:
        return userReview ? [userReview, ...reviews] : reviews;
    }
  }, [reviewsSortedBy, selectedBoba, isShowingReviews, user]);

  const shopsOfBoba: Shop[] = useMemo(() => {
    if (isLocationEnabled && storeLocationMap.size > 0) {
      //Assume storeIds in map are sorted by distance in ascending order
      const shopIds = Array.from(storeLocationMap.keys()).filter((shopId) =>
        selectedBoba?.shopId.some((id) => id.toString() === shopId)
      );
      return shopIds.map((shopId) =>
        shops.find((shop) => shop._id === shopId)
      ) as Shop[];
    } else {
      return selectedBoba?.shopId.map((shopId) =>
        shops.find((shop) => shop._id === shopId.toString())
      ) as Shop[];
    }
  }, [shops, selectedBoba, isLocationEnabled, storeLocationMap]);

  const handleShopClick = (shop: Shop) => {
    if (selectedShop?._id === shop._id) {
      setSelectedShop(null);
    } else {
      setSelectedShop(shop);
    }
  };

  if (!selectedBoba) {
    return (
      <div className="flex flex-col items-center justify-center ring-1 ring-gray-200 rounded-lg p-2 space-y-2">
        <GiBoba className="size-24 text-muted-foreground" />
        <h2 className="text-xl font-semibold text-muted-foreground">
          Select a boba
        </h2>
        <p className="text-sm text-muted-foreground">
          Click on any boba from the list to see detailed information
        </p>
      </div>
    );
  }

  return (
    <div className="ring-1 ring-gray-200 rounded-lg p-2 space-y-2">
      {/* Boba Name*/}
      <h2 className="text-xl font-bold">{selectedBoba.name}</h2>

      {/* Rating */}
      <div className="flex items-center gap-1">
        <FaStar
          className={`${
            selectedBoba.enjoymentFactor >= 4
              ? "text-yellow-500"
              : "text-gray-400"
          } size-4`}
        />
        <p className="text-sm text-muted-foreground">
          {selectedBoba.enjoymentFactor.toFixed(2)}
        </p>
        <p className="text-sm text-muted-foreground">
          ({selectedBoba.communityReviews.length} reviews)
        </p>
      </div>

      {/* Flavors */}
      <h2 className="text-lg font-semibold">Flavors</h2>
      <div className="flex overflow-x-auto items-center gap-2">
        {selectedBoba.flavors.map((flavor) => (
          <div
            key={flavor}
            className="text-xs font-semibold text-black bg-gray-100 px-2 py-1 rounded-full"
          >
            {flavor}
          </div>
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
                  selectedBoba.sweetnessLevel === "Low"
                    ? "w-1/3"
                    : selectedBoba.sweetnessLevel === "Medium"
                      ? "w-2/3"
                      : "w-full"
                }
                transition-all duration-300 ease-in-out
                `}
          />
        </div>
        <div className="flex-1/8">{selectedBoba.sweetnessLevel}</div>
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
          }&q=${
            selectedShop
              ? encodeURIComponent(`place_id:${selectedShop.location.placesId}`)
              : userLocation
                ? `${userLocation.latitude},${userLocation.longitude}`
                : "here"
          }`}
        ></iframe>
      </div>

      {/* Shop Cards */}
      <h2 className="text-lg font-semibold">Shops</h2>
      <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto p-2">
        {shopsOfBoba.map((shop) => (
          <LocationCard
            key={shop._id}
            shop={shop}
            handleShopClick={handleShopClick}
          />
        ))}
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
            {!hasUserReviewed && (
              <button
                className={`ring-1 ring-gray-200 rounded-lg p-2 ${
                  isAddingReview ? "ring-pink-500" : ""
                }`}
                onClick={() => setIsAddingReview(!isAddingReview)}
              >
                <MdAdd className="size-4 text-pink-500" />
              </button>
            )}
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
                bobaId={selectedBoba._id}
                setReviewsSortedBy={setReviewsSortedBy}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DetailCard;
