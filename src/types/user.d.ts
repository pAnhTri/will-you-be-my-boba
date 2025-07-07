import { ShopType } from "@/lib/mongodb/models/Shop";
import { UserType } from "@/lib/mongodb/models/User";

export type PopulatedUserType = Omit<UserType, "favoriteShops"> & {
  favoriteShops: (ShopType & { _id: string })[];
};
