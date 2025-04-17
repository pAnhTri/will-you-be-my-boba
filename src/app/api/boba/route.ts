import { Boba, dbConnect } from "@/lib/mongodb";
import { BobaSchema } from "@/lib/validators";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const GET = async (req: NextRequest) => {
  await dbConnect();

  const searchParams = req.nextUrl.searchParams;
  const filter = searchParams.get("filter");

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
    let result;
    let flavors = [];

    if (filter) {
      const queryFilter: Partial<{
        name: { $regex: RegExp };
        flavors: { $in: string[] };
      }> = {};
      const enjoymentFilter: Partial<{
        enjoymentFactor: { $lte?: number; $gte?: number };
      }> = {};

      const { name, flavors: filterFlavors, enjoyment } = JSON.parse(filter);

      if (name && name.trim()) {
        queryFilter.name = { $regex: new RegExp(name.trim(), "i") };
      }

      if (
        filterFlavors &&
        Array.isArray(filterFlavors) &&
        filterFlavors.length > 0
      ) {
        queryFilter.flavors = { $in: filterFlavors };
      }

      if (enjoyment) {
        enjoymentFilter.enjoymentFactor = {
          ...(enjoyment.min ? { $gte: Number(enjoyment.min) } : {}),
          ...(enjoyment.max ? { $lte: Number(enjoyment.max) } : {}),
        };
      }

      result = await Boba.aggregate([
        { $match: queryFilter },
        aggregateOperations.addFields,
        { $match: enjoymentFilter },
        aggregateOperations.sort,
        aggregateOperations.project,
      ]);
    } else {
      result = await Boba.aggregate([
        aggregateOperations.addFields,
        aggregateOperations.sort,
        aggregateOperations.project,
      ]);

      flavors = Array.from(new Set(result.flatMap((boba) => boba.flavors)));
      flavors.sort((a, b) => a.localeCompare(b));
    }

    return NextResponse.json(
      {
        success: true,
        bobas: result,
        ...(flavors.length > 0 ? { flavors } : {}),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching boba data:", error);
    return NextResponse.json(
      { success: false, error: "Error fetching boba data" },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    await dbConnect();

    const body = await req.json();

    const validatedData = BobaSchema.parse(body);

    const { name, flavors, communityReviews, shopId, sweetnessLevel } =
      validatedData;

    await Boba.findOneAndUpdate(
      { name },
      {
        $set: { sweetnessLevel },
        $addToSet: {
          flavors: { $each: flavors || [] },
          communityReviews: { $each: communityReviews || [] },
          shopId: shopId,
        },
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Error creating boba:", err);

    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: err.errors },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        { success: false, error: "Failed to create boba entry." },
        { status: 500 }
      );
    }
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    await dbConnect();

    const searchParams = req.nextUrl.searchParams;

    const name = searchParams.get("name");

    if (!name) throw new Error("No name given");

    const body = await req.json();

    // Partial validation schema
    const updateSchema = BobaSchema.partial();

    const validatedData = updateSchema.parse(body);
    let updateBody = {};
    let communityReviews: {
      userName: string;
      rating: number;
    }[] = [];

    if ("communityReviews" in validatedData && validatedData.communityReviews) {
      const tempObject = { ...validatedData, communityReviews: undefined };
      communityReviews = validatedData.communityReviews;
      updateBody = tempObject;
    } else {
      updateBody = validatedData;
    }

    const update =
      communityReviews.length > 0
        ? {
            $set: updateBody,
            $addToSet: {
              communityReviews: { $each: communityReviews },
            },
          }
        : {
            $set: updateBody,
          };

    const updatedBoba = await Boba.findOneAndUpdate(
      {
        name,
      },
      update,
      { runValidators: true }
    );

    return NextResponse.json(
      { success: true, update: updatedBoba },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error updating boba:", err);

    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: err.errors },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        { success: false, error: "Failed to update boba entry." },
        { status: 500 }
      );
    }
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    await dbConnect();

    const searchParams = req.nextUrl.searchParams;

    const name = searchParams.get("name");

    if (!name) throw new Error("No name given");

    const deletedBoba = await Boba.findOneAndDelete({ name });

    return NextResponse.json(
      { success: true, delete: deletedBoba },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error deleting boba:", err);

    return NextResponse.json(
      { success: false, error: "Failed to delete boba entry." },
      { status: 500 }
    );
  }
};
