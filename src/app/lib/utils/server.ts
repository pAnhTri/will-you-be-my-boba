import { Boba, dbConnect, Shop } from "../mongodb";

export const getAllBobaData = async () => {
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
        _id: 0,
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
    const result = await Boba.aggregate([
      aggregateOperations.addFields,
      aggregateOperations.sort,
      aggregateOperations.project,
    ]);

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

export const getAllShopData = async () => {
  await dbConnect();

  const aggregateOperations = {
    addFields: {
      $addFields: {
        menu: {
          $map: {
            input: "$bobaData",
            as: "boba",
            in: {
              name: "$$boba.name",
              enjoymentFactor: {
                $cond: {
                  if: { $gt: [{ $size: "$$boba.communityReviews" }, 0] },
                  then: {
                    $avg: {
                      $map: {
                        input: "$$boba.communityReviews",
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
        },
      },
    },
    lookup: {
      $lookup: {
        from: "bobas",
        localField: "_id",
        foreignField: "shopId",
        as: "bobaData",
      },
    },
    project: {
      $project: {
        name: 1,
        menu: 1,
        location: 1,
        ratings: 1,
      },
    },
    sort: {
      $sort: { name: 1 as 1 | -1 },
    },
  };

  try {
    const result = await Shop.aggregate([
      aggregateOperations.lookup,
      aggregateOperations.addFields,
      aggregateOperations.sort,
      aggregateOperations.project,
    ]);

    const plainResult = JSON.parse(JSON.stringify(result));

    return { shop: plainResult };
  } catch (error) {
    console.error("Error in getAllShopData:", error);
    return null;
  }
};
