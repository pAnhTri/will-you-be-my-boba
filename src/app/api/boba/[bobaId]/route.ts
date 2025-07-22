import { dbConnect, Boba, User } from "@/lib/mongodb";
import { BobaDocument } from "@/lib/mongodb/models/Boba";
import { generateUsername } from "@/lib/utils";
import { bobaDocumentValidatorSchema } from "@/lib/validators/boba";
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

    const { userId, rating, review, shopId } = await req.json();

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
        communityReviews: {
          userId,
          userName: username,
          rating,
          review,
          shopId,
        },
      },
    });

    await User.findOneAndUpdate(
      { supabaseId: userId },
      {
        $push: { reviews: { bobaId, rating, review, shopId } },
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

export const PATCH = async (
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ bobaId: string }>;
  }
): Promise<
  NextResponse<
    | { success: boolean; boba: BobaDocument | null }
    | { success: false; message: string }
  >
> => {
  try {
    const { bobaId } = await params;

    await dbConnect();

    const { name, flavors, shopId } = await req.json();

    if (Object.keys({ name, flavors, shopId }).length === 0) {
      return NextResponse.json(
        { success: false, message: "No fields to update" },
        { status: 400 }
      );
    }

    // Validate payload
    const validatedPayload = bobaDocumentValidatorSchema.partial().safeParse({
      name,
      flavors,
      shopId,
    });

    if (!validatedPayload.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation error",
        },
        { status: 400 }
      );
    }

    const boba = await Boba.findById(bobaId);

    if (!boba) {
      return NextResponse.json(
        { success: false, message: "Boba not found" },
        { status: 404 }
      );
    }

    // Update boba
    const updatedBoba = await Boba.findByIdAndUpdate(
      bobaId,
      {
        $set: {
          name,
          flavors,
          shopId,
        },
      },
      { new: true }
    );

    return NextResponse.json({ success: true, boba: updatedBoba });
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
