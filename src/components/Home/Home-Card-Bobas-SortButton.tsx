import { useBobaStore } from "@/lib/zustand/stores";

interface SortButtonProps {
  icon: React.ReactNode;
  label: string;
  sortedBy: string;
  onClick: () => void;
}

const SortButton = ({ icon, label, onClick, sortedBy }: SortButtonProps) => {
  const displayBobas = useBobaStore((state) => state.displayBobas);

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 h-auto text-xs rounded-md border border-gray-200 transition-all duration-200 ${
        sortedBy === label
          ? "bg-gray-100 text-gray-900"
          : "text-gray-600 hover:bg-gray-50 hover:border-gray-300"
      } disabled:opacity-50 disabled:cursor-not-allowed`}
      disabled={displayBobas.length === 0}
    >
      {icon}
      {label}
    </button>
  );
};

export default SortButton;
