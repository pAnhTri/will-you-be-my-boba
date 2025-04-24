import HomeCard from "@/components/Home/Home-Card";
import BobaCard from "@/components/Home/Home-Card-Bobas";
import DetailCard from "@/components/Home/Home-Card-Details";
import FlavorCard from "@/components/Home/Home-Card-Flavors";
import HomeCardsSkeleton from "@/components/Home/Home-Cards-Skeleton";
import { getBobaData, getShopData } from "@/lib/utils/server";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function Home() {
  const bobaData = await getBobaData();
  const shopData = await getShopData();

  if (!bobaData || !shopData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>No data found</p>
      </div>
    );
  }

  const { bobas = [], flavors = [] } = bobaData;
  const { shop = [] } = shopData;

  return (
    <>
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

      <main className="flex container">
        <Suspense fallback={<HomeCardsSkeleton />}>
          <HomeCard>
            <FlavorCard initialFlavors={flavors} />
            <BobaCard initialBobas={bobas} />
            <DetailCard initialShops={shop} />
          </HomeCard>
        </Suspense>
      </main>
    </>
  );
}
