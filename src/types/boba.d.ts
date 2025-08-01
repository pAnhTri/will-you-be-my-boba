import {
  BobaDocument,
  BobaType,
  CommunityReviewDocument,
  SweetnessDocument,
} from "@/lib/mongodb/models/Boba";
import { ShopDocument } from "@/lib/mongodb/models/Shop";

export type Boba = BobaType & {
  _id: string;
  enjoymentFactor: number;
};

export type PopulatedBobaSweetness = SweetnessDocument & {
  shopId: ShopDocument;
};

export type PopulatedBobaCommunityReview = CommunityReviewDocument & {
  shopId: ShopDocument;
};

export type PopulatedBoba = Omit<
  BobaDocument,
  "shopId" | "sweetness" | "communityReviews"
> & {
  sweetness: PopulatedBobaSweetness[];
  communityReviews: PopulatedBobaCommunityReview[];
  shopId: ShopDocument[];
  enjoymentFactor?: number;
};
