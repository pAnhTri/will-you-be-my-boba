import { getBobaData, getShopData } from "@/lib/utils/server";
import DynamicHome from "@/components/Home/Home-Dynamic";
import ReportAlert from "@/components/Home/Alert/ReportAlert";

// Force dynamic rendering to ensure fresh data on each page load
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
        <div className="mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Will You Be My Boba?
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover and share your favorite boba drinks with our community.
          </p>
        </div>
      </section>

      <main className="flex flex-col px-4 relative">
        <ReportAlert />
        <DynamicHome
          initialFlavors={flavors}
          initialBobas={bobas}
          initialShops={shops}
        />
      </main>
    </div>
  );
}
