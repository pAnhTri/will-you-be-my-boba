import { Boba } from "@/types/boba";
import { Boba as BobaModel, dbConnect, Report, Shop, User } from "../mongodb";
import { createClient } from "../supabase/server";

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
        sweetness: 1,
        flavors: 1,
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

    const flavors: string[] = await BobaModel.distinct("flavors").sort({
      flavors: 1,
    });

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

export const getShopData = async () => {
  await dbConnect();

  const aggregateOperations = {
    addFields: {
      $addFields: {
        menu: {
          $map: {
            input: "$bobaData",
            as: "boba",
            in: {
              _id: "$$boba._id",
              name: "$$boba.name",
              flavors: "$$boba.flavors",
              sweetnessLevel: "$$boba.sweetnessLevel",
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

    return { shops: plainResult };
  } catch (error) {
    console.error("Error fetching shop data:", error);
    return null;
  }
};

export const getAvatar = async () => {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return null;
    }

    // Filter the storage bucket for avatars
    const { data, error } = await supabase.storage
      .from("avatars")
      .list(user.id, {
        search: "avatar",
        sortBy: {
          column: "created_at",
          order: "desc",
        },
      });

    if (error) {
      throw error;
    }

    if (!data || data.length === 0) {
      return null;
    }

    // Clean up the files when it has reached more than 10, but keep the latest 1
    if (data.length > 10) {
      const deletePromises = data
        .slice(1)
        .map((file) =>
          supabase.storage.from("avatars").remove([`${user.id}/${file.name}`])
        );

      await Promise.all(deletePromises);
    }

    const fileName = data[0].name;
    const { data: publicUrlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(`${user.id}/${fileName}`);

    return publicUrlData.publicUrl;
  } catch (error) {
    console.error("Error fetching avatar file:", error);
    return null;
  }
};

export const getUser = async (supabaseId: string) => {
  try {
    await dbConnect();

    const user = await User.findOne({ supabaseId }).populate("favoriteShops");

    if (!user) {
      return null;
    }

    const plainResult = JSON.parse(JSON.stringify(user));
    return plainResult;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

export const getAllReports = async () => {
  try {
    await dbConnect();

    const reports = await Report.find({}).populate("shop");

    const plainResult = JSON.parse(JSON.stringify(reports));
    return plainResult;
  } catch (error) {
    console.error("Error fetching reports:", error);
    return null;
  }
};

export const getReportByType = async (
  type: "flavor" | "shop" | "name" | "other" | "solved"
) => {
  try {
    await dbConnect();

    const reportsByType = await Report.find({
      type: { $regex: type, $options: "i" },
    }).populate("shop");

    if (!reportsByType) {
      return null;
    }

    const plainResult = JSON.parse(JSON.stringify(reportsByType));
    return plainResult;
  } catch (error) {
    console.error("Error fetching reports by type:", error);
    return null;
  }
};
