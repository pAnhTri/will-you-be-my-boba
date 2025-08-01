import { PipelineStage } from "mongoose";

const sanitizeFlavorsArray = (flavors: string): string[] => {
  if (!flavors || flavors === "" || flavors === '""') return [];
  return flavors
    .split(",")
    .filter((flavor) => flavor.trim() !== "" && flavor.trim() !== '""');
};

export const getBobaPipelineStages = (
  q: string = "",
  page: number = 0,
  limit: number = 20,
  sort: string = "name",
  sortOrder: string = "asc",
  flavors: string = ""
): PipelineStage[] => {
  const pagesToSkip = page * limit;

  const query = q ? { name: { $regex: q, $options: "i" } } : {};

  const flavorsArray = sanitizeFlavorsArray(flavors);

  const flavorsQuery =
    flavorsArray.length > 0
      ? {
          $or: flavorsArray.map((flavor) => ({
            flavors: { $regex: `^${flavor}$`, $options: "i" },
          })),
        }
      : {};

  return [
    {
      $match: {
        ...query,
        ...flavorsQuery,
      },
    },
    {
      $sort: {
        [sort]: sortOrder === "asc" ? 1 : -1,
      },
    },
    {
      $skip: pagesToSkip,
    },
    {
      $limit: limit,
    },
    {
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
    {
      $lookup: {
        from: "shops",
        localField: "shopId",
        foreignField: "_id",
        as: "shopId",
      },
    },
    {
      $unwind: {
        path: "$sweetness",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "shops",
        localField: "sweetness.shopId",
        foreignField: "_id",
        as: "sweetnessShop",
      },
    },
    {
      $addFields: {
        sweetness: {
          $mergeObjects: [
            { sweetnessLevel: "$sweetness.sweetnessLevel" },
            {
              shopId: {
                $arrayElemAt: ["$sweetnessShop", 0],
              },
            },
          ],
        },
      },
    },
    {
      $project: {
        sweetnessShop: 0,
      },
    },
    {
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        shopId: { $first: "$shopId" },
        enjoymentFactor: { $first: "$enjoymentFactor" },
        communityReviews: { $first: "$communityReviews" },
        sweetness: { $push: "$sweetness" },
        flavors: { $first: "$flavors" },
      },
    },
    {
      $sort: {
        [sort]: sortOrder === "asc" ? 1 : -1,
      },
    },
  ];
};
