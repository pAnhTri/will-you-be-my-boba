import { Dispatch, SetStateAction } from "react";
import { useFilterContext } from "../contexts/FilterProvider";
import { sortByDistance, sortByEnjoyment, sortByName } from "../utils";

interface BobaCardsSortButtonsProps {
  allowDistance: boolean;
  isLoading: boolean;
  sortedBy: string;
  setSortedBy: Dispatch<SetStateAction<string>>;
}

const BobaCardsSortButtons = ({
  allowDistance,
  isLoading,
  sortedBy,
  setSortedBy,
}: BobaCardsSortButtonsProps) => {
  const { bobaList, shopDistances, setBobaList } = useFilterContext();

  const handleOnClick = (sortType: string) => {
    switch (sortType) {
      case "Name": {
        const BobasSortedByName = sortByName(bobaList);
        setBobaList(BobasSortedByName);
        setSortedBy("Name");
        break;
      }
      case "Enjoyment": {
        const BobaSortedByEnjoyment = sortByEnjoyment(bobaList);
        setBobaList(BobaSortedByEnjoyment);
        setSortedBy("Enjoyment");
        break;
      }
      case "Distance":
        const BobaSortedByDistance = sortByDistance(
          bobaList,
          shopDistances as Map<string, number>
        );
        setBobaList(BobaSortedByDistance);
        setSortedBy("Distance");
        break;
      default:
        console.error("Invalid sort type.");
    }
  };

  if (isLoading) return <h1>Getting current location...</h1>;

  return (
    <div className="flex flex-col justify-center items-center mb-2">
      <p>Sort By:</p>
      <div className="flex justify-between items-center gap-2 text-sm text-white">
        <button
          type="button"
          onClick={() => handleOnClick("Name")}
          className={`rounded-md px-1 ${
            sortedBy === "Name"
              ? "bg-blue-500"
              : "bg-blue-400 shadow-xs shadow-black"
          }`}
        >
          Name
        </button>
        <button
          type="button"
          onClick={() => handleOnClick("Enjoyment")}
          className={`rounded-md px-1 ${
            sortedBy === "Enjoyment"
              ? "bg-blue-500"
              : "bg-blue-400 shadow-xs shadow-black"
          }`}
        >
          Enjoyment
        </button>
        {allowDistance && (
          <button
            type="button"
            onClick={() => handleOnClick("Distance")}
            className={`rounded-md px-1 ${
              sortedBy === "Distance"
                ? "bg-blue-500"
                : "bg-blue-400 shadow-xs shadow-black"
            }`}
          >
            Distance
          </button>
        )}
      </div>
    </div>
  );
};

export default BobaCardsSortButtons;
