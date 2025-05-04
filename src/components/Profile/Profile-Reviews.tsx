"use client";

import { useProfileStore } from "@/lib/zustand/stores";
import { Boba } from "@/types/boba";
import { LuStar } from "react-icons/lu";

interface ProfileReviewsProps {
  bobas: Boba[];
}

const ProfileReviews = ({ bobas }: ProfileReviewsProps) => {
  const userProfile = useProfileStore((state) => state.userProfile);
  const currentTab = useProfileStore((state) => state.currentTab);

  const reviewsWithBobaName = userProfile?.reviews.map((review) => {
    const boba = bobas.find((boba) => boba._id.toString() === review.bobaId);
    return { ...review, bobaName: boba?.name ?? "" };
  });

  if (currentTab !== "reviews") {
    return null;
  }

  if (reviewsWithBobaName?.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">No reviews found</div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
      {reviewsWithBobaName?.map((review) => (
        <div
          key={review._id.toString()}
          className="bg-white rounded-lg p-4 border-2 border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 break-words"
        >
          {/* Name + rating */}
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-gray-800">
              {review.bobaName}
            </h3>
            <div className="flex items-center gap-1">
              <LuStar className="text-yellow-400 w-4 h-4" />
              <p className="text-sm font-medium text-gray-700">
                {review.rating}
              </p>
            </div>
          </div>

          {/* Review */}
          <div className="text-sm text-gray-600 leading-relaxed">
            {review.review}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileReviews;
