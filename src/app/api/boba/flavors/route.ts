import { Boba, dbConnect } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const GET = async (): Promise<
  NextResponse<
    | { success: boolean; flavors: string[] }
    | { success: false; message: string }
  >
> => {
  try {
    await dbConnect();

    const flavors = await Boba.distinct("flavors").sort({ name: 1 });

    return NextResponse.json({ success: true, flavors }, { status: 200 });
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
