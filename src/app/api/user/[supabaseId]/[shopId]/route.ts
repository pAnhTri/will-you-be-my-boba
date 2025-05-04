import User from "@/lib/mongodb/models/User";
import { NextRequest, NextResponse } from "next/server";

const runFavoriteShopUpdate = async (
  supabaseId: string,
  shopId: string,
  operation: "add" | "remove"
) => {
  const updateOperation =
    operation === "add"
      ? { $addToSet: { favoriteShops: shopId } }
      : { $pull: { favoriteShops: shopId } };
  try {
    const updatedUser = await User.findOneAndUpdate(
      { supabaseId },
      updateOperation,
      { new: true, runValidators: true }
    );

    return updatedUser;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      throw new Error("Database error occurred");
    }
    throw new Error("Internal server error");
  }
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ supabaseId: string; shopId: string }> }
) => {
  try {
    const { supabaseId, shopId } = await params;

    //Operation
    const { operation } = await req.json();

    if (!supabaseId || !shopId) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request parameters",
        },
        { status: 400 }
      );
    }

    if (!operation || !(operation === "add" || operation === "remove")) {
      return NextResponse.json({
        success: false,
        message: "Operation not found",
      });
    }

    const updatedUser = await runFavoriteShopUpdate(
      supabaseId,
      shopId,
      operation
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
