import { Boba } from "@/types/boba";
import { Boba as BobaModel, dbConnect } from "../mongodb";

export const getBobaData = async () => {
  await dbConnect();

  const aggregateOperations = {
    addFields: {
      $addFields: {
        enjoymentFactor: {
          $cond: {
            if: { $gt: [{ $size: "$communityReviews" }, 0] },
            then: {
              $avg: {
                $map: {
                  input: "$communityReviews",
                  as: "review",
                  in: "$$review.rating",
                },
              },
            },
            else: 0,
          },
        },
      },
    },
    project: {
      $project: {
        _id: 1,
        shopId: 1,
        name: 1,
        flavors: 1,
        sweetnessLevel: 1,
        communityReviews: 1,
        enjoymentFactor: 1,
      },
    },
    sort: { $sort: { enjoymentFactor: -1 as 1 | 1 } },
  };

  try {
    const result: Boba[] | null = await BobaModel.aggregate([
      aggregateOperations.addFields,
      aggregateOperations.sort,
      aggregateOperations.project,
    ]);

    if (!result || result.length === 0) {
      return null;
    }

    const flavors = Array.from(new Set(result.flatMap((boba) => boba.flavors)));
    flavors.sort((a, b) => a.localeCompare(b));

    const plainResult = JSON.parse(JSON.stringify(result));

    return {
      bobas: plainResult,
      flavors,
    };
  } catch (error) {
    console.error("Error fetching boba data:", error);
    return null;
  }
};
