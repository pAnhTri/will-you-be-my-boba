import { Dispatch, SetStateAction } from "react";
import { getGeoLocation } from "../utils";
import { useFilterContext } from "../contexts/FilterProvider";

interface BobaCardsDistanceToggleButtonProps {
  allowDistance: boolean;
  isLoading: boolean;
  setAllowDistance: Dispatch<SetStateAction<boolean>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}
const BobaCardsDistanceToggleButton = ({
  allowDistance,
  isLoading,
  setAllowDistance,
  setIsLoading,
}: BobaCardsDistanceToggleButtonProps) => {
  const { userLocation, setUserLocation } = useFilterContext();
  const handleOnChange = () => {
    if (userLocation) {
      // User is toggling OFF
      setUserLocation(null);
      setAllowDistance(false);
    } else {
      setIsLoading(true);
      // User is toggling ON → get location first
      getGeoLocation((coordinates) => {
        if (coordinates) {
          setUserLocation(coordinates);
          setAllowDistance(true);
        } else {
          setAllowDistance(false);
        }

        setIsLoading(false);
      });
    }
  };

  return (
    <div className="flex justify-between items-center gap-2">
      <label htmlFor="distanceToggle">Allow Distance</label>
      <input
        type="checkbox"
        id="distanceToggle"
        name="distanceToggle"
        onChange={handleOnChange}
        checked={allowDistance}
        disabled={isLoading}
      />
    </div>
  );
};

export default BobaCardsDistanceToggleButton;
