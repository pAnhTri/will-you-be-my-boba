import { Boba, dbConnect } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ bobaId: string; reviewId: string }>;
  }
) => {
  try {
    const { bobaId, reviewId } = await params;

    if (!bobaId || !reviewId) {
      return NextResponse.json(
        { success: false, message: "Boba ID and review ID are required" },
        { status: 400 }
      );
    }

    const { rating, review } = await req.json();

    if (!rating && rating !== 0) {
      return NextResponse.json(
        { success: false, message: "Rating is required" },
        { status: 400 }
      );
    }

    await dbConnect();

    await Boba.findByIdAndUpdate(
      bobaId,
      {
        "communityReviews.$[review].rating": rating,
        "communityReviews.$[review].review": review,
        "communityReviews.$[review].isEdited": true,
      },
      { arrayFilters: [{ "review._id": reviewId }] }
    );

    return NextResponse.json({ success: true, message: "Review updated" });
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

export const DELETE = async (
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ bobaId: string; reviewId: string }>;
  }
) => {
  try {
    const { bobaId, reviewId } = await params;

    if (!bobaId || !reviewId) {
      return NextResponse.json(
        { success: false, message: "Boba ID and review ID are required" },
        { status: 400 }
      );
    }

    await dbConnect();

    await Boba.findByIdAndUpdate(bobaId, {
      $pull: { communityReviews: { _id: reviewId } },
    });

    return NextResponse.json({ success: true, message: "Review deleted" });
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
