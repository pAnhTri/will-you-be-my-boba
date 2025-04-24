import { ShopType } from "@/lib/mongodb/models/Shop";

export type Shop = ShopType & {
  _id: string;
  menu: {
    name: string;
    enjoymentFactor: number;
  }[];
};
