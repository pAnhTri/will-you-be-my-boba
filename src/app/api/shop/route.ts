import { dbConnect, Shop } from "@/lib/mongodb";
import { ShopDocument } from "@/lib/mongodb/models/Shop";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (): Promise<
  NextResponse<
    | { success: boolean; shops: ShopDocument[] }
    | { success: false; message: string }
  >
> => {
  try {
    await dbConnect();

    const shops = await Shop.find({});

    return NextResponse.json({ success: true, shops }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return NextResponse.json(
        {
          success: false,
          message: error.message || "Database error occurred",
        },
        { status: 500 }
      );
    }
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const { data } = await req.json();

    if (!data) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request payload",
        },
        { status: 400 }
      );
    }

    // Ensure database connection
    await dbConnect();

    const result = await Shop.findOneAndUpdate(
      {
        "location.placesId": data.location.placesId,
      },
      {
        $set: data,
      },
      { upsert: true, new: true, runValidators: true }
    );

    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return NextResponse.json(
        {
          success: false,
          message: error.message || "Database error occurred",
        },
        { status: 500 }
      );
    }
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
};
