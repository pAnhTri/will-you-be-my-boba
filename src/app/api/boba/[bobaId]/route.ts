import { dbConnect, Boba, User } from "@/lib/mongodb";
import { generateUsername } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ bobaId: string }>;
  }
) => {
  try {
    const { bobaId } = await params;

    if (!bobaId) {
      return NextResponse.json(
        { success: false, message: "Boba ID is required" },
        { status: 400 }
      );
    }

    const { userId, rating, review } = await req.json();

    if (!rating && rating !== 0) {
      return NextResponse.json(
        { success: false, message: "Rating is required" },
        { status: 400 }
      );
    }

    await dbConnect();

    // Generate a username if there is none
    let username = generateUsername();

    if (userId) {
      const user = await User.findOne({ supabaseId: userId });
      if (user?.username) {
        username = user.username;
      }
    }

    await Boba.findByIdAndUpdate(bobaId, {
      $push: {
        communityReviews: { userId, userName: username, rating, review },
      },
    });

    await User.findOneAndUpdate(
      { supabaseId: userId },
      {
        $push: { reviews: { bobaId, rating, review } },
      }
    );

    return NextResponse.json({ success: true, message: "Review added" });
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
