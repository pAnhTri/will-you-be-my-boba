import { Boba } from "./boba";
import { GooglePlace } from "./location";
import { Shop } from "./shop";

export interface BobaAPI {
  success: boolean;
  bobas?: Boba[];
  flavors?: string[];
  error?: string;
}

export interface ShopAPI {
  success: boolean;
  shop?: Shop[];
}

export interface LocationAPI {
  success: boolean;
  places?: GooglePlace[];
}
