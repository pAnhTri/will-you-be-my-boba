import { dbConnect } from "@/lib/mongodb";
import ShopDetailCache from "@/lib/mongodb/models/ShopDetailCache";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { placeId } = await req.json();

    // Find shop in cache first if not found then get from google places api
    await dbConnect();

    const cachedShop = await ShopDetailCache.findOne({ placeId });

    if (cachedShop) {
      return NextResponse.json({
        success: true,
        place: {
          rating: cachedShop.rating,
          userRatingCount: cachedShop.userRatingCount,
        },
      });
    }

    const API_KEY = process.env.GOOGLE_BACKEND_API_KEY;

    if (!API_KEY) {
      return NextResponse.json(
        {
          success: false,
          message: "API key is not set",
        },
        { status: 500 }
      );
    }

    const GooglePlaceURL = `https://places.googleapis.com/v1/places/${placeId}`;

    const headers = {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": API_KEY,
      "X-Goog-FieldMask": ["rating", "userRatingCount"],
    };

    const { data: response } = await axios.get(GooglePlaceURL, {
      headers,
    });

    // Cache the shop details
    await ShopDetailCache.create({
      placeId,
      rating: response.rating,
      userRatingCount: response.userRatingCount,
    });

    return NextResponse.json(
      {
        success: true,
        place: response,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
};
