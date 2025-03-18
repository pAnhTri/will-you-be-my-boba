"use client";
import { useEffect, useState } from "react";
import { useFilterContext } from "../contexts/FilterProvider";
import DetailsCardUserReviews from "./DetailsCardUserReviews";
import { updateBobaDatabase } from "../utils/bobaAPI";
import DetailsCardLocation from "./DetailsCardLocation";

const DetailsCard = () => {
  const { selectedBoba, fetchBobaList } = useFilterContext();

  const [ratingAndLoading, setRatingAndLoading] = useState<{
    rating: number | null;
    loading: boolean;
  }>({ rating: null, loading: false });
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const { rating, loading } = ratingAndLoading;

    if (typeof rating === "number" && loading && selectedBoba) {
      updateBobaDatabase(selectedBoba.name, rating)
        .then((result) => {
          if (!result) {
            throw new Error(
              "Internal Error: Could not update Boba in Database"
            );
          }
          return fetchBobaList();
        })
        .then(() => {
          setRatingAndLoading({
            ...ratingAndLoading,
            rating: null,
            loading: false,
          });
        })
        .catch((error) => {
          console.error("Failed to add Boba:", error);
          setErrorMessage(error.message || "Failed to connect to the server.");
          setRatingAndLoading({
            ...ratingAndLoading,
            rating: null,
            loading: false,
          });
        });
    }
  }, [ratingAndLoading]);

  if (!selectedBoba) return null;

  if (ratingAndLoading.loading) return <div>LOADING</div>;

  return (
    <div className="basis-1/3 display-card flex flex-col gap-2">
      {errorMessage && <span>{errorMessage}</span>}
      <DetailsCardLocation shopId={selectedBoba.shopId} />
      <DetailsCardUserReviews
        communityReviews={selectedBoba.communityReviews}
        setRatingAndLoading={setRatingAndLoading}
      />
    </div>
  );
};

export default DetailsCard;
