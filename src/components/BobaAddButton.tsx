import React from "react";
import { IoAdd } from "react-icons/io5";

interface BobaAddButtonProps {
  setIsBobaAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const BobaAddButton = ({ setIsBobaAddModalOpen }: BobaAddButtonProps) => {
  return (
    <button
      type="button"
      className="fixed bottom-1 right-1 flex max-h-52 max-w-52 rounded-full bg-radial from-[#d508ac] to-[#b536a8] shadow shadow-black hover:bg-[rgba(192,192,192,0.6)] bg-blend-overlay transition duration-300"
      onClick={() => setIsBobaAddModalOpen(true)}
    >
      <IoAdd size={52} color="white" />
    </button>
  );
};

export default BobaAddButton;
