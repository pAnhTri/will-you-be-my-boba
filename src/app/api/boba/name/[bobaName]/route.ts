import { Boba, dbConnect } from "@/lib/mongodb";
import { BobaType } from "@/lib/mongodb/models/Boba";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ bobaName: string }> }
) => {
  const { bobaName } = await params;

  try {
    await dbConnect();

    const boba: BobaType | null = await Boba.findOne({ name: bobaName });

    if (!boba) {
      return NextResponse.json(
        {
          success: false,
          message: "Boba not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      boba,
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
