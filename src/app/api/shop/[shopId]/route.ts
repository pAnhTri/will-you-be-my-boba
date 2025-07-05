import { dbConnect, Shop } from "@/lib/mongodb";
import { ShopType } from "@/lib/mongodb/models/Shop";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ shopId: string }> }
) => {
  const { shopId } = await params;

  try {
    await dbConnect();

    const shop: ShopType | null = await Shop.findById(shopId);

    if (!shop) {
      return NextResponse.json(
        {
          success: false,
          message: "Shop not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      shop,
    });
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
