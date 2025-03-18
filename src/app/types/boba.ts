export interface Boba {
  name: string;
  shopId: string[];
  flavors: string[];
  sweetnessLevel: "Low" | "Medium" | "High";
  enjoymentFactor: number;
  communityReviews: {
    userName: string;
    rating: number;
  }[];
}
