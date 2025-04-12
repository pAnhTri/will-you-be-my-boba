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
import { getBobaData, getShopData } from "../utils/bobaAPI";
import { calculateDistanceFromCurrentLocation } from "../utils";

interface FilterContextProps {
  bobaList: Boba[];
  flavorList: string[];
  isBobaAddModalOpen: boolean;
  isLocationModalOpen: boolean;
  selectedBoba: Boba | null;
  selectedTags: string[];
  shopDistances: Map<string, number> | undefined;
  shopList: Shop[];
  userLocation: {
    lat: number;
    lng: number;
  } | null;
  fetchBobaList: () => Promise<void>;
  fetchShopList: () => Promise<void>;
  setBobaList: Dispatch<SetStateAction<Boba[]>>;
  setFlavorList: Dispatch<SetStateAction<string[]>>;
  setIsBobaAddModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsLocationModalOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedBoba: Dispatch<SetStateAction<Boba | null>>;
  setSelectedTags: Dispatch<SetStateAction<string[]>>;
  setShopDistances: Dispatch<SetStateAction<Map<string, number> | undefined>>;
  setShopList: Dispatch<SetStateAction<Shop[]>>;
  setUserLocation: Dispatch<
    SetStateAction<{
      lat: number;
      lng: number;
    } | null>
  >;
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

  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [shopDistances, setShopDistances] = useState<Map<string, number>>();

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

  const fetchShopList = async () => {
    try {
      const shopData = await getShopData();
      if (shopData) {
        const { shop = [] } = shopData;
        setShopList(shop);
      }
    } catch (error) {
      console.error("Failed to fetch updated shop list:", error);
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

  useMemo(() => {
    if (!userLocation) return;

    const distanceMap = new Map<string, number>(); //Key is shop id, value is distance from current location to shop

    shopList.map((shop) => {
      const shopCoordinates: {
        lat: number;
        lng: number;
      } = {
        lat: shop.location.latitude,
        lng: shop.location.longitude,
      };
      const distance = calculateDistanceFromCurrentLocation(
        userLocation,
        shopCoordinates
      );
      distanceMap.set(shop._id, distance);
    });

    setShopDistances(distanceMap);
  }, [userLocation, shopList]);

  return (
    <FilterContext.Provider
      value={{
        bobaList: filteredBobas,
        flavorList,
        isBobaAddModalOpen,
        isLocationModalOpen,
        selectedBoba,
        selectedTags,
        shopDistances,
        shopList,
        userLocation,
        fetchBobaList,
        fetchShopList,
        setBobaList,
        setFlavorList,
        setIsBobaAddModalOpen,
        setIsLocationModalOpen,
        setSelectedBoba,
        setSelectedTags,
        setShopDistances,
        setShopList,
        setUserLocation,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
