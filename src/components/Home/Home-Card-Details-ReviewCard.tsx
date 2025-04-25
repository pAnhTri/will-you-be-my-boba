import { CommunityReviewType } from "@/lib/mongodb/models/Boba";
import { FaStar } from "react-icons/fa";
import { getTimeAgo, toLocalTime } from "@/lib/utils";
import { useAuthStore, useBobaStore } from "@/lib/zustand/stores";
import ActionButton from "./Home-Card-Details-ReviewCard-ActionButton";
import {
  deleteCommunityReview,
  getBobas,
  updateCommunityReview,
} from "@/lib/utils/api/boba";
import { FiLoader } from "react-icons/fi";
import { CiCircleAlert } from "react-icons/ci";
import { useState } from "react";
import EditForm from "./Home-Card-Details-ReviewCard-EditReviewForm";
import { ReviewInput } from "@/lib/validators/review";
interface ReviewCardProps {
  bobaId: string;
  review: CommunityReviewType;
  setReviewsSortedBy: (reviewsSortedBy: string) => void;
}

const ReviewCard = ({
  bobaId,
  review,
  setReviewsSortedBy,
}: ReviewCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const user = useAuthStore((state) => state.user);

  const { setSelectedBoba, setBobas, setDisplayBobas } = useBobaStore(
    (state) => state
  );

  const isOwner = () => {
    return user?.id === review.userId;
  };

  const handleDeleteClick = async (reviewId: string) => {
    // Reset Loading + Error
    setIsLoading(true);
    setError(null);

    // Delete Review
    try {
      await deleteCommunityReview(reviewId, bobaId);

      // Fetch updated bobas from database optimistically// Fetch updated bobas from database optimistically
      const updatedBobas = await getBobas();

      //From the updated bobas, find the updated boba and update the selectedBoba
      const updatedBoba = updatedBobas.bobas.find(
        (boba) => boba._id === bobaId
      );

      if (!updatedBoba) {
        throw new Error("Boba not found");
      }

      // Update UI
      setBobas(updatedBobas.bobas);
      setDisplayBobas(updatedBobas.bobas);
      setSelectedBoba(updatedBoba);
      setReviewsSortedBy("newest");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleEditSubmit = async (data: ReviewInput) => {
    // Reset Loading + Error
    setIsLoading(true);
    setError(null);

    // Update Review
    try {
      await updateCommunityReview(
        data,
        (review as CommunityReviewType & { _id: string })._id,
        bobaId
      );

      // Fetch updated bobas from database optimistically// Fetch updated bobas from database optimistically
      const updatedBobas = await getBobas();

      //From the updated bobas, find the updated boba and update the selectedBoba
      const updatedBoba = updatedBobas.bobas.find(
        (boba) => boba._id === bobaId
      );

      if (!updatedBoba) {
        throw new Error("Boba not found");
      }

      // Update UI
      setBobas(updatedBobas.bobas);
      setDisplayBobas(updatedBobas.bobas);
      setSelectedBoba(updatedBoba);
      setReviewsSortedBy("newest");
      setIsEditing(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <FiLoader className="animate-spin size-4" />
        {isEditing ? <p>Updating review...</p> : <p>Deleting review...</p>}
      </div>
    );
  }

  if (isEditing) {
    return (
      <EditForm
        review={review}
        setIsEditing={setIsEditing}
        handleEditSubmit={handleEditSubmit}
      />
    );
  }

  return (
    <div
      className={`ring-1 ring-gray-200 rounded-lg p-2 ${
        isOwner() && "ring-pink-500"
      }`}
    >
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md flex items-start gap-2 text-sm">
          <CiCircleAlert className="size-4 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
      <div className="flex items-center justify-between">
        {/* Username + Rating */}
        <div className="flex items-center gap-2">
          <p>{review.userName}</p>
          <div className="flex items-center gap-1">
            <FaStar className="size-4 text-yellow-500" />
            <p className="text-sm text-muted-foreground">{review.rating}</p>
          </div>
        </div>
        {/* Edit + Delete if owner */}
        {isOwner() && (
          <div className="flex items-center gap-2">
            <ActionButton
              variant="edit"
              reviewId={(review as CommunityReviewType & { _id: string })._id}
              onClick={handleEditClick}
            />
            <ActionButton
              variant="delete"
              reviewId={(review as CommunityReviewType & { _id: string })._id}
              onClick={handleDeleteClick}
            />
          </div>
        )}
      </div>
      {/* Comment */}
      <div className="text-sm text-muted-foreground whitespace-pre-wrap break-words">
        {review.review}
      </div>
      {/* Time ago */}
      <p className="text-xs text-muted-foreground">
        {getTimeAgo(toLocalTime(review.createdAt.toString()))}
      </p>
      {/* Edited */}
      {review.isEdited && (
        <p className="text-xs text-muted-foreground">(Edited)</p>
      )}
    </div>
  );
};

export default ReviewCard;
