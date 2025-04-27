import { Boba, dbConnect } from "@/lib/mongodb";
import User from "@/lib/mongodb/models/User";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ supabaseId: string }> }
) => {
  try {
    const { supabaseId } = await params;

    if (!supabaseId) {
      return NextResponse.json(
        {
          success: false,
          message: "Supabase ID is required",
        },
        { status: 400 }
      );
    }

    await dbConnect();

    const user = await User.findOne({ supabaseId });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, user }, { status: 200 });
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

export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ supabaseId: string }> }
) => {
  try {
    const { supabaseId } = await params;

    if (!supabaseId) {
      return NextResponse.json(
        { success: false, message: "Supabase ID is required" },
        { status: 400 }
      );
    }

    const { username } = await req.json();

    if (!username) {
      return NextResponse.json(
        { success: false, message: "Username is required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const user = await User.findOneAndUpdate(
      { supabaseId },
      { username },
      { new: true, runValidators: true }
    );

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Cascading update to community reviews
    await Boba.updateMany(
      { "communityReviews.userId": supabaseId },
      { $set: { "communityReviews.$.userName": username } }
    );

    return NextResponse.json({ success: true, user }, { status: 200 });
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
