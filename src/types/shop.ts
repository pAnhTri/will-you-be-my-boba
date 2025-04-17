import { z } from "zod";
import { ShopSchema } from "@/lib/validators";

type ShopType = z.infer<typeof ShopSchema>;

export interface Shop extends ShopType {
  _id: string;
  menu: {
    name: string;
    enjoymentFactor: number;
  }[];
}
