"use client";

import { useShopStore } from "@/lib/zustand/stores";
import { Shop } from "@/types/shop";
import { useEffect } from "react";

interface DetailCardProps {
  initialShops: Shop[];
}

const DetailCard = ({ initialShops }: DetailCardProps) => {
  const shops = useShopStore((state) => state.shops);
  const { setShops } = useShopStore();

  useEffect(() => {
    setShops(initialShops);
  }, [initialShops]);

  return <div>DetailCard</div>;
};

export default DetailCard;
