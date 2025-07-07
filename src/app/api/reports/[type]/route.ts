import { dbConnect, Report } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) => {
  try {
    await dbConnect();

    const { type } = await params;

    const reports = await Report.find({
      type: { $regex: type, $options: "i" },
    }).populate("shop");

    return NextResponse.json(reports);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
