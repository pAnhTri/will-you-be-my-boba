import { useBobaStore } from "@/lib/zustand/stores/boba";
import { useFlavorStore } from "@/lib/zustand/stores/flavor";

interface RandomButtonProps {
  onClick: () => void;
}

const RandomButton = ({ onClick }: RandomButtonProps) => {
  const selectedFlavors = useFlavorStore((state) => state.selectedFlavors);
  const bobas = useBobaStore((state) => state.bobas);

  return (
    <div
      className={`p-[2px] rounded-lg ${
        selectedFlavors.length < 3
          ? "bg-gradient-to-r from-red-500 to-blue-500 hover:from-red-600 hover:to-blue-600"
          : "bg-slate-400"
      } shadow-sm transition-all duration-300`}
    >
      <button
        className={`flex flex-col items-center justify-center px-4 py-2 rounded-md text-white font-medium ${
          selectedFlavors.length < 3 && bobas.length > 0
            ? "bg-gradient-to-tr from-[#D8AB17] to-[#70D6FF] hover:from-[#E8BB27] hover:to-[#80E6FF] active:scale-95"
            : "bg-slate-300"
        } transition-all duration-300 disabled:bg-slate-300 disabled:cursor-not-allowed`}
        type="button"
        disabled={selectedFlavors.length > 2 || bobas.length === 0}
        onClick={onClick}
      >
        <span className="text-sm font-semibold">IDK</span>
        <span className="text-xs">Help Me T-T</span>
      </button>
    </div>
  );
};

export default RandomButton;
