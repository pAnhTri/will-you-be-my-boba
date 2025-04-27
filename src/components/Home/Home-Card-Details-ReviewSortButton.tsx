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
    newest: <FaSortAmountDown className="size-3" />,
    oldest: <FaSortAmountUp className="size-3" />,
    highest: <FaStar className="size-3" />,
    lowest: <FaStar className="size-3" />,
  };

  const variantText = {
    newest: <span className="text-sm">Newest</span>,
    oldest: <span className="text-sm">Oldest</span>,
    highest: <span className="text-sm">Highest</span>,
    lowest: <span className="text-sm">Lowest</span>,
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
