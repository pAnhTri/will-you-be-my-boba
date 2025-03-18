import FilterProvider from "./contexts/FilterProvider";
import FlavorCards from "./components/FlavorCards";
import BobaCards from "./components/BobaCards";
import { getBobaData, getShopData } from "./utils/bobaAPI";
import LocationModal from "./components/LocationModal";
import DetailsCard from "./components/DetailsCard";

export default async function Home() {
  const bobaData = await getBobaData();
  const shopData = await getShopData();

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
        <div className="flex gap-2">
          <FlavorCards />
          <BobaCards />
          <DetailsCard />
        </div>
      </div>
    </FilterProvider>
  );
}
