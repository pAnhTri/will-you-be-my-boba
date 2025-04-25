import React from "react";
import { IoMdClose } from "react-icons/io";

interface CloseButtonProps {
  onClick: () => void;
}

const CloseButton = ({ onClick }: CloseButtonProps) => {
  return (
    <button className="text-gray-500 hover:text-gray-700" onClick={onClick}>
      <IoMdClose className="size-6" />
    </button>
  );
};

export default CloseButton;
