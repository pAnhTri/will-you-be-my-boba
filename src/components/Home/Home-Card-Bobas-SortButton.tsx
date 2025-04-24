interface SortButtonProps {
  icon: React.ReactNode;
  label: string;
  sortedBy: string;
  onClick: () => void;
}

const SortButton = ({ icon, label, onClick, sortedBy }: SortButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 h-auto text-xs rounded-md border border-gray-200 transition-all duration-200 ${
        sortedBy === label
          ? "bg-gray-100 text-gray-900"
          : "text-gray-600 hover:bg-gray-50 hover:border-gray-300"
      }`}
    >
      {icon}
      {label}
    </button>
  );
};

export default SortButton;
