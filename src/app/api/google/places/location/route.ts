import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { placeId } = await req.json();

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
      "X-Goog-Api-Key": process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      "X-Goog-FieldMask": ["rating", "userRatingCount"],
    };

    const { data: response } = await axios.get(GooglePlaceURL, {
      headers,
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
