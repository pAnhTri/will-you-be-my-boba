import { MdAdd } from "react-icons/md";

interface AddButtonProps {
  onClick: () => void;
}

const AddButton = ({ onClick }: AddButtonProps) => {
  return (
    <button
      className="ring-1 ring-gray-200 rounded-full p-2 hover:bg-gray-100"
      onClick={onClick}
    >
      <MdAdd className="size-4 text-pink-500" />
    </button>
  );
};

export default AddButton;
