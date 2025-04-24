import { CommunityReviewType } from "@/lib/mongodb/models/Boba";
import { toZonedTime } from "date-fns-tz";
import { differenceInDays } from "date-fns/differenceInDays";
import { FaStar } from "react-icons/fa";

interface ReviewCardProps {
  review: CommunityReviewType;
}

const toLocalTime = (date: Date | string) => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (typeof date === "string") {
    return toZonedTime(date, timeZone);
  } else {
    const dateString = date.toISOString();
    return toZonedTime(dateString, timeZone);
  }
};

const getTimeAgo = (date: Date) => {
  const now = new Date();
  const diffDays = differenceInDays(now, date);
  if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else if (diffDays < 30) {
    return `${Math.floor(diffDays / 7)} weeks ago`;
  } else if (diffDays < 365) {
    return `${Math.floor(diffDays / 30)} months ago`;
  } else {
    return `${Math.floor(diffDays / 365)} years ago`;
  }
};

const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <div className="ring-1 ring-gray-200 rounded-lg p-2">
      <div className="flex items-center justify-between">
        {/* Username + Rating */}
        <div className="flex items-center gap-2">
          <p>{review.userName}</p>
          <div className="flex items-center gap-1">
            <FaStar className="size-4 text-yellow-500" />
            <p className="text-sm text-muted-foreground">{review.rating}</p>
          </div>
        </div>
      </div>
      {/* Comment */}
      <p className="text-sm text-muted-foreground">{review.review}</p>
      {/* Time ago */}
      <p className="text-sm text-muted-foreground">
        {getTimeAgo(toLocalTime(review.createdAt.toString()))}
      </p>
    </div>
  );
};

export default ReviewCard;
