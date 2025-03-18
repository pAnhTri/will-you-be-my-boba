import { NextRequest, NextResponse } from "next/server";
import { dbConnect, Shop } from "@/app/lib/mongodb";

export const GET = async (req: NextRequest) => {
  await dbConnect();

  const searchParams = req.nextUrl.searchParams;

  const filter = searchParams.get("filter");

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

  if (filter) {
    const queryFilter: Partial<{
      name: { $regex: RegExp };
    }> = {};

    const { name } = JSON.parse(filter);

    if (name && name.trim()) {
      queryFilter.name = { $regex: new RegExp(name.trim(), "i") };
    }

    return Shop.aggregate([
      { $match: queryFilter },
      aggregateOperations.lookup,
      aggregateOperations.addFields,
      aggregateOperations.sort,
      aggregateOperations.project,
    ])
      .then((result) => {
        return NextResponse.json(
          { success: true, shop: result },
          { status: 200 }
        );
      })
      .catch((error) => {
        console.error("Error fetching shop data:", error);
        return NextResponse.json({ success: false }, { status: 500 });
      });
  } else {
    return Shop.aggregate([
      aggregateOperations.lookup,
      aggregateOperations.addFields,
      aggregateOperations.sort,
      aggregateOperations.project,
    ])
      .then((result) => {
        return NextResponse.json(
          { success: true, shop: result },
          { status: 200 }
        );
      })
      .catch((error) => {
        console.error("Error fetching shop data:", error);
        return NextResponse.json({ success: false }, { status: 500 });
      });
  }
};
