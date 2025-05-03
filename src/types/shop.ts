import { ShopType } from "@/lib/mongodb/models/Shop";

export type Shop = ShopType & {
  _id: string;
  menu: {
    _id: string;
    name: string;
    flavors: string[];
    enjoymentFactor: number;
  }[];
};
