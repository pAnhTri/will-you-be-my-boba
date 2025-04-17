import React, { Dispatch, SetStateAction } from "react";
import { GooglePlace } from "../types";
import { addShopToDatabase } from "../lib/utils/bobaAPI";
import { useFilterContext } from "../contexts/FilterProvider";

interface LocationModalAddLocationButtonProps {
  selectedGooglePlace: GooglePlace | null;
  setErrorMessage: Dispatch<SetStateAction<string>>;
  setIsLocationModalOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedGooglePlace: Dispatch<SetStateAction<GooglePlace | null>>;
}

const LocationModalAddLocationButton = ({
  selectedGooglePlace,
  setErrorMessage,
  setIsLocationModalOpen,
  setSelectedGooglePlace,
}: LocationModalAddLocationButtonProps) => {
  const { fetchShopList } = useFilterContext();
  const handleOnClick = () => {
    if (selectedGooglePlace) {
      addShopToDatabase(selectedGooglePlace)
        .then(() => fetchShopList())
        .then(() => {
          setIsLocationModalOpen(false);
        })
        .catch((error) => {
          console.error("Failed to add search shops:", error);
          setErrorMessage(error.message || "Failed to connect to the server.");
          setSelectedGooglePlace(null);
        });
    }
  };

  return (
    <button
      type="button"
      className="h-fit w-fit bg-blue-400 hover:bg-blue-500 p-2 rounded-md text-white shadow-black shadow-sm self-center mt-2"
      onClick={handleOnClick}
    >
      Add Shop
    </button>
  );
};

export default LocationModalAddLocationButton;
