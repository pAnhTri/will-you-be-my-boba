import { FaTrash } from "react-icons/fa";

import { FaEdit } from "react-icons/fa";

interface ActionButtonProps {
  reviewId: string;
  variant: "edit" | "delete";
  onClick: (reviewId: string) => void;
}

const ActionButton = ({ reviewId, variant, onClick }: ActionButtonProps) => {
  const variants = {
    edit: `ring-1 ring-gray-200 rounded-lg p-2`,
    delete: `ring-1 ring-gray-200 rounded-lg p-2`,
  };

  const variantIcon = {
    edit: <FaEdit className="size-3 text-gray-500" />,
    delete: <FaTrash className="size-3 text-red-500" />,
  };

  return (
    <button className={variants[variant]} onClick={() => onClick(reviewId)}>
      {variantIcon[variant]}
    </button>
  );
};

export default ActionButton;
