import Card from "@/components/Shops/Shops-Card";
import LocationCard from "@/components/Shops/Shops-Card-Location";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shops | Will You Be My Boba",
  description: "Explore the best boba tea shops in your area",
};

export const dynamic = "force-dynamic";

const Shop = async () => {
  return (
    <>
      <section className="bg-gradient-to-r from-pink-50 to-purple-50 text-center py-6 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Explore Boba Shops
        </h1>
        <p className="text-lg text-muted-foreground">
          Discover the best boba tea shops in your area and find your new
          favorite spot.
        </p>
      </section>

      <main className="container px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <LocationCard />
          </Card>
          <div className="border">Main 2</div>
          <div className="border">Main 3</div>
        </div>
      </main>
    </>
  );
};

export default Shop;
