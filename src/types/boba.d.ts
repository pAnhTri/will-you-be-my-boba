import { BobaType } from "@/lib/mongodb/models/Boba";

export type Boba = BobaType & {
  _id: string;
  enjoymentFactor: number;
};
