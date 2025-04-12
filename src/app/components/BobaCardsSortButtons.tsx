import { useFilterContext } from "../contexts/FilterProvider";
import { sortByEnjoyment, sortByName } from "../utils";

interface BobaCardsSortButtonsProps {
  allowDistance: boolean;
  isLoading: boolean;
}

const BobaCardsSortButtons = ({
  allowDistance,
  isLoading,
}: BobaCardsSortButtonsProps) => {
  const { bobaList, setBobaList } = useFilterContext();

  const handleOnClick = (sortType: string) => {
    switch (sortType) {
      case "Name": {
        const BobasSortedByName = sortByName(bobaList);
        setBobaList(BobasSortedByName);
        break;
      }
      case "Enjoyment": {
        const BobaSortedByEnjoyment = sortByEnjoyment(bobaList);
        setBobaList(BobaSortedByEnjoyment);
        break;
      }
      case "Distance":
      default:
        console.error("Invalid sort type.");
    }
  };

  if (isLoading) return <h1>Getting current location...</h1>;

  return (
    <div className="flex justify-between items-center gap-2">
      <button type="button" onClick={() => handleOnClick("Name")}>
        Name
      </button>
      <button type="button" onClick={() => handleOnClick("Enjoyment")}>
        Enjoyment
      </button>
      {allowDistance && <button type="button">Distance</button>}
    </div>
  );
};

export default BobaCardsSortButtons;
