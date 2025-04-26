import { MdAdd } from "react-icons/md";

interface AddButtonProps {
  variant: "no-bobas" | "bobas";
  onClick: () => void;
}

const AddButton = ({ variant, onClick }: AddButtonProps) => {
  const variants = {
    "no-bobas": {
      className: "ring-1 ring-gray-200 rounded-full p-2 hover:bg-gray-100",
      element: <MdAdd className="size-20 text-pink-500" />,
    },
    bobas: {
      className: "ring-1 ring-gray-200 rounded-full p-2 hover:bg-gray-100",
      element: <MdAdd className="size-4 text-pink-500" />,
    },
  };

  return (
    <button className={variants[variant].className} onClick={onClick}>
      {variants[variant].element}
    </button>
  );
};

export default AddButton;
