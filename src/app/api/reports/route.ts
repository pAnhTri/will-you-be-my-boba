import { dbConnect, Report } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export const POST = async (req: NextRequest) => {
  try {
    const { reportType, boba, shop, comment } = await req.json();

    if (!reportType || !boba) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    await dbConnect();

    const report = await Report.create({
      type: reportType,
      boba,
      shop: shop ? mongoose.Types.ObjectId.createFromHexString(shop) : null,
      comment,
    });

    if (!report) {
      return NextResponse.json(
        { message: "Failed to create report" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Report created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
};
