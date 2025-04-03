import { useFilterContext } from "../contexts/FilterProvider";

interface FlavorRandomButtonProps {
  possibleFlavorCombination: string[];
}

const FlavorRandomButton = ({
  possibleFlavorCombination,
}: FlavorRandomButtonProps) => {
  const { bobaList, selectedTags, setSelectedTags } = useFilterContext();

  const handleOnClick = () => {
    const randomFlavor =
      possibleFlavorCombination[
        Math.floor(Math.random() * possibleFlavorCombination.length)
      ];

    setSelectedTags([...selectedTags, randomFlavor]);
  };

  return (
    <div
      className={`p-[2px] rounded-md ${
        selectedTags.length < 3
          ? "bg-gradient-to-r from-red-500 to-blue-500"
          : "bg-slate-500"
      } shadow-sm shadow-black`}
    >
      <button
        className={`flex flex-col p-1 text-white ${
          selectedTags.length < 3 &&
          bobaList.length > 0 &&
          "bg-gradient-to-tr from-[#D8AB17] to-[#70D6FF] hover:bg-[rgba(192,192,192,0.6)] bg-blend-overlay"
        } transition duration-300 disabled:bg-slate-400`}
        type="button"
        disabled={selectedTags.length > 2 || bobaList.length === 0}
        onClick={handleOnClick}
      >
        <span>IDK</span>
        <span>Help Me T-T</span>
      </button>
    </div>
  );
};

export default FlavorRandomButton;
