"use client";

import dynamic from "next/dynamic";
import { Boba } from "@/types/boba";
import { Shop } from "@/types/shop";

const AddBobaModal = dynamic(
  () => import("@/components/Home/Home-Modal-AddBoba"),
  {
    ssr: false,
  }
);

const AddShopModal = dynamic(
  () => import("@/components/Home/Home-Modal-AddShop"),
  {
    ssr: false,
  }
);

const LocationForm = dynamic(
  () => import("@/components/Home/Home-LocationForm"),
  {
    ssr: false,
  }
);

const HomeCanvas = dynamic(() => import("@/components/Home/Home-Canvas"), {
  ssr: false,
});

const FlavorCard = dynamic(
  () => import("@/components/Home/Home-Card-Flavors"),
  {
    ssr: false,
  }
);

const BobaCard = dynamic(() => import("@/components/Home/Home-Card-Bobas"), {
  ssr: false,
});

const ReportModal = dynamic(
  () => import("@/components/Home/Modal/ReportModal"),
  {
    ssr: false,
  }
);

interface DynamicHomeProps {
  initialFlavors: string[];
  initialBobas: Boba[];
  initialShops: Shop[];
}

export const DynamicHome = ({
  initialFlavors,
  initialBobas,
  initialShops,
}: DynamicHomeProps) => {
  return (
    <>
      <AddBobaModal />
      <AddShopModal />
      <ReportModal />
      <LocationForm
        className="my-8 mx-auto"
        topLabel="Where are we heading? Enter a street, city, or zip code"
      />
      <HomeCanvas className="my-8 container md:max-w-screen">
        <FlavorCard initialFlavors={initialFlavors} />
        <BobaCard initialBobas={initialBobas} initialShops={initialShops} />
      </HomeCanvas>
    </>
  );
};

export default DynamicHome;
