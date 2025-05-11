import Card from "@/components/Shops/Shops-Card";
import Details from "@/components/Shops/Shops-Card-Details";
import LocationCard from "@/components/Shops/Shops-Card-Location";
import ShopInfo from "@/components/Shops/Shops-Card-ShopInfo";
import { ShopType } from "@/lib/mongodb/models/Shop";
import { createClient } from "@/lib/supabase/server";
import { getBobaData, getShopData, getUser } from "@/lib/utils/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shops | Will You Be My Boba",
  description: "Explore the best boba tea shops in your area",
};

export const dynamic = "force-dynamic";

const Shop = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const supabaseId = user?.id;

  let userData = null;

  if (supabaseId) {
    userData = await getUser(supabaseId);
  }

  const shopData = await getShopData();
  const bobaData = await getBobaData();

  if (!shopData || !bobaData) {
    return <div>No data found</div>;
  }

  const { shops } = shopData;

  const favoriteShops: (ShopType & { _id: string })[] =
    userData?.favoriteShops || [];
  console.log(favoriteShops);

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
          <Card>
            <ShopInfo initialShops={shops} />
          </Card>
          <Card>
            <Details initialFavoriteShops={favoriteShops} />
          </Card>
        </div>
      </main>
    </>
  );
};

export default Shop;
