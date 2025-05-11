import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb/connect";
import { User } from "@/lib/mongodb";

export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ supabaseId: string; avatarURL: string }> }
) => {
  try {
    const { supabaseId, avatarURL } = await params;

    console.log("avatarURL", avatarURL);
    console.log("supabaseId", supabaseId);

    if (!supabaseId || !avatarURL) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request parameters",
        },
        { status: 400 }
      );
    }

    await dbConnect();

    console.log("avatarURL", avatarURL);
    console.log("supabaseId", supabaseId);

    const updatedUser = await User.findOneAndUpdate(
      { supabaseId },
      { $set: { avatar: avatarURL } },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        user: updatedUser,
      },
      { status: 200 }
    );
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
