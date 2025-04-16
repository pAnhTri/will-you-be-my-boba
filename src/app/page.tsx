export const dynamic = "force-dynamic";

import FilterProvider from "./contexts/FilterProvider";
import FlavorCards from "./components/FlavorCards";
import BobaCards from "./components/BobaCards";
import LocationModal from "./components/LocationModal";
import DetailsCard from "./components/DetailsCard";
import BobaAddModal from "./components/BobaAddModal";
import { getAllBobaData, getAllShopData } from "./lib/utils";

export default async function Home() {
  const bobaData = await getAllBobaData();
  const shopData = await getAllShopData();

  if (!(bobaData && shopData)) {
    return (
      <div>
        <h1>HOME PAGE</h1>
        <p className="text-red-500">
          Error fetching data. Please try again later.
        </p>
      </div>
    );
  }
  const { bobas = [], flavors = [] } = bobaData;
  const { shop = [] } = shopData;

  return (
    <FilterProvider
      initialBobas={bobas}
      initialFlavors={flavors}
      initialShops={shop}
    >
      <div>
        <LocationModal />
        <BobaAddModal />
        <div className="flex gap-2">
          <FlavorCards />
          <BobaCards />
          <DetailsCard />
        </div>
      </div>
    </FilterProvider>
  );
}
