import { ShopType } from "@/lib/mongodb/models/Shop";

export type MenuItem = {
  _id: string;
  name: string;
  flavors: string[];
  enjoymentFactor: number;
  sweetnessLevel: string;
};

export type Shop = ShopType & {
  _id: string;
  menu: MenuItem[];
};
