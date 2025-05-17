import HomeCanvas from "@/components/Home/Home-Canvas";
import BobaCard from "@/components/Home/Home-Card-Bobas";
import FlavorCard from "@/components/Home/Home-Card-Flavors";
import LocationForm from "@/components/Home/Home-LocationForm";
import AddBobaModal from "@/components/Home/Home-Modal-AddBoba";
import AddShopModal from "@/components/Home/Home-Modal-AddShop";
import { getBobaData, getShopData } from "@/lib/utils/server";

export const dynamic = "force-dynamic";

export default async function Home() {
  const bobaData = await getBobaData();
  const shopData = await getShopData();

  const { bobas = [], flavors = [] } = bobaData || {};
  const { shops = [] } = shopData || {};

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Quick and minimal */}
      <section className="bg-gradient-to-r from-pink-50 to-purple-50 py-6 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Will You Be My Boba?
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover and share your favorite boba drinks with our community.
          </p>
        </div>
      </section>

      <main className="flex flex-col px-4 container">
        <AddBobaModal />
        <AddShopModal />
        <LocationForm
          className="my-8 mx-auto"
          topLabel="Where are we heading? Enter a street, city, or zip code"
        />
        <HomeCanvas className="my-8">
          <FlavorCard initialFlavors={flavors} />
          <BobaCard initialBobas={bobas} initialShops={shops} />
        </HomeCanvas>
      </main>
    </div>
  );
}
