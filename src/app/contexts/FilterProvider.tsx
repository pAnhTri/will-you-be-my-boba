"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";
import { Boba, Shop } from "../types";
import { getBobaData } from "../utils/bobaAPI";

interface FilterContextProps {
  bobaList: Boba[];
  flavorList: string[];
  isBobaAddModalOpen: boolean;
  isLocationModalOpen: boolean;
  selectedBoba: Boba | null;
  selectedTags: string[];
  shopList: Shop[];
  fetchBobaList: () => Promise<void>;
  setFlavorList: Dispatch<SetStateAction<string[]>>;
  setIsBobaAddModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsLocationModalOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedBoba: Dispatch<SetStateAction<Boba | null>>;
  setSelectedTags: Dispatch<SetStateAction<string[]>>;
  setShopList: Dispatch<SetStateAction<Shop[]>>;
}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context)
    throw new Error("useFilterContext must be used within FilterProvider");
  return context;
};

interface FilterProviderProps {
  children: React.ReactNode;
  initialBobas: Boba[];
  initialFlavors: string[];
  initialShops: Shop[];
}

const FilterProvider = ({
  children,
  initialBobas,
  initialFlavors,
  initialShops,
}: FilterProviderProps) => {
  // Filters for boba and flavors
  const [bobaList, setBobaList] = useState<Boba[]>(initialBobas);
  const [shopList, setShopList] = useState<Shop[]>(initialShops);
  const [flavorList, setFlavorList] = useState<string[]>(initialFlavors);
  const [selectedBoba, setSelectedBoba] = useState<Boba | null>(null);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [prevSelectedTags, setPrevSelectedTags] = useState<string[]>([]);

  // Modals
  const [isLocationModalOpen, setIsLocationModalOpen] =
    useState<boolean>(false);
  const [isBobaAddModalOpen, setIsBobaAddModalOpen] = useState<boolean>(false);

  const fetchBobaList = async () => {
    try {
      const bobaData = await getBobaData();
      if (bobaData) {
        const { bobas = [], flavors = [] } = bobaData;
        setBobaList(bobas);
        setFlavorList(flavors);
      }
    } catch (error) {
      console.error("Failed to fetch updated boba list:", error);
    }
  };

  const filteredBobas = useMemo(() => {
    if (selectedTags.length === 0) return bobaList;
    return bobaList.filter((boba) =>
      selectedTags.every((tag) => boba.flavors.includes(tag))
    );
  }, [selectedTags, bobaList]);

  useMemo(() => {
    if (selectedBoba) {
      setPrevSelectedTags(selectedTags);
      setSelectedTags(selectedBoba.flavors);
    } else {
      setSelectedTags(prevSelectedTags);
    }
  }, [selectedBoba]);

  useMemo(() => {
    if (selectedBoba) {
      const updatedBoba = bobaList.find(
        (boba) => boba.name === selectedBoba.name
      ) as Boba;
      setSelectedBoba(updatedBoba);
    }
  }, [bobaList]);

  return (
    <FilterContext.Provider
      value={{
        bobaList: filteredBobas,
        flavorList,
        isBobaAddModalOpen,
        isLocationModalOpen,
        selectedBoba,
        selectedTags,
        shopList,
        fetchBobaList,
        setFlavorList,
        setIsBobaAddModalOpen,
        setIsLocationModalOpen,
        setSelectedBoba,
        setSelectedTags,
        setShopList,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
