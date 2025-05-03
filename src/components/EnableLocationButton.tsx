import { useLocationStore } from "@/lib/zustand/stores";
import { FiLoader } from "react-icons/fi";

interface EnableLocationButtonProps {
  isLoading: boolean;
  handleEnableLocationClick: () => void;
}

const EnableLocationButton = ({
  isLoading,
  handleEnableLocationClick,
}: EnableLocationButtonProps) => {
  const isLocationEnabled = useLocationStore(
    (state) => state.isLocationEnabled
  );

  return (
    <div className="flex items-center gap-2">
      {isLoading ? (
        <>
          <FiLoader className="size-4 animate-spin" />
          <span>Getting Location...</span>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            id="location"
            checked={isLocationEnabled}
            onChange={handleEnableLocationClick}
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
          />
          <label
            htmlFor="location"
            className="text-xs text-gray-600 cursor-pointer hover:text-gray-900 transition-colors duration-200"
          >
            {isLocationEnabled ? "Disable Location" : "Enable Location"}
          </label>
        </>
      )}
    </div>
  );
};

export default EnableLocationButton;
