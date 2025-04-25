import { dbConnect, Boba, User } from "@/lib/mongodb";
import { generateUsername } from "@/lib/utils";
import { MongooseError } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: Promise<{ id: string }>;
}

export const PUT = async (req: NextRequest, { params }: Params) => {
  try {
    const { id } = await params;

    if (!id) {
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

    await Boba.findByIdAndUpdate(id, {
      $push: {
        communityReviews: { userId, userName: username, rating, review },
      },
    });

    await User.findOneAndUpdate(
      { supabaseId: userId },
      {
        $push: { reviews: { bobaId: id, rating, review } },
      }
    );

    return NextResponse.json({ success: true, message: "Review added" });
  } catch (error) {
    if (error instanceof MongooseError) {
      console.error(error);
      return NextResponse.json(
        {
          success: false,
          message: error.message,
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
