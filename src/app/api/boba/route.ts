import { Boba, dbConnect } from "@/lib/mongodb";
import { getBobaData } from "@/lib/utils/server";
import { MongooseError } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const result = await getBobaData();

    return NextResponse.json(
      {
        success: true,
        bobas: result?.bobas,
        flavors: result?.flavors,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof MongooseError) {
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

export const POST = async (req: NextRequest) => {
  try {
    const payload = await req.json();

    if (!payload) {
      return NextResponse.json(
        {
          success: false,
          message: "Payload is required",
        },
        { status: 400 }
      );
    }

    const { name, flavors, sweetness, shopId } = payload;

    if (!name || !flavors || !sweetness || !shopId) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    // Final flavor check to remove empty strings, strings with only spaces, and capitalize each word
    const finalFlavors = flavors
      .map((flavor: string) =>
        flavor
          .trim()
          .split(" ")
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      )
      .filter((flavor: string) => flavor.trim() !== "");

    await dbConnect();

    const currentSweetness = await Boba.findOne({ name }).select("sweetness");

    let updatedSweetness = [sweetness]; // Initialize with the new sweetness value

    if (currentSweetness) {
      // Check if the sweetness already exists
      const sweetnessExists = currentSweetness.sweetness.find(
        (sweetness: { sweetnessLevel: string; shopId: string }) =>
          sweetness.shopId === shopId
      );

      if (sweetnessExists) {
        // Update the sweetness level if the shopId matches
        updatedSweetness = currentSweetness.sweetness.map(
          (currentSweetness: { sweetnessLevel: string; shopId: string }) => {
            if (currentSweetness.shopId === shopId) {
              return {
                sweetnessLevel: sweetness.sweetnessLevel,
                shopId: sweetness.shopId,
              };
            }
            return currentSweetness;
          }
        );
      } else {
        // Add the new sweetness if the shopId does not match
        updatedSweetness = [...currentSweetness.sweetness, sweetness];
      }
    }

    await Boba.findOneAndUpdate(
      { name },
      {
        $addToSet: {
          flavors: { $each: finalFlavors },
          shopId,
        },
        sweetness: updatedSweetness,
      },
      { upsert: true, new: true, runValidators: true }
    );

    return NextResponse.json({ success: true }, { status: 200 });
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
