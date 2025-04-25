import { FaSortAmountUp } from "react-icons/fa";

import { FaStar } from "react-icons/fa";

import { FaSortAmountDown } from "react-icons/fa";

interface ReviewSortButtonProps {
  variant: "newest" | "oldest" | "highest" | "lowest";
  reviewsSortedBy: string;
  setReviewsSortedBy: (reviewsSortedBy: string) => void;
}

const ReviewSortButton = ({
  variant,
  reviewsSortedBy,
  setReviewsSortedBy,
}: ReviewSortButtonProps) => {
  const variantIcon = {
    newest: <FaSortAmountDown />,
    oldest: <FaSortAmountUp />,
    highest: <FaStar />,
    lowest: <FaStar />,
  };

  const variantText = {
    newest: "Newest",
    oldest: "Oldest",
    highest: "Highest",
    lowest: "Lowest",
  };

  const handleClick = () => {
    if (variant === reviewsSortedBy && variant === "newest") {
      setReviewsSortedBy("oldest");
    } else if (variant === reviewsSortedBy && variant === "oldest") {
      setReviewsSortedBy("newest");
    } else if (variant === reviewsSortedBy && variant === "highest") {
      setReviewsSortedBy("lowest");
    } else if (variant === reviewsSortedBy && variant === "lowest") {
      setReviewsSortedBy("highest");
    } else {
      setReviewsSortedBy(variant);
    }
  };

  return (
    <button
      className={`flex items-center gap-2 ${
        variant === reviewsSortedBy ? "text-pink-500" : ""
      }`}
      onClick={handleClick}
    >
      {variantIcon[variant]}
      {variantText[variant]}
    </button>
  );
};

export default ReviewSortButton;
