import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { searchText } = await req.json();

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

    const GooglePlaceURL = `https://places.googleapis.com/v1/places:searchText`;

    const searcQuery = `(boba OR tea OR cafe OR milk OR boba tea OR boba shop OR boba cafe) ${
      searchText !== "" ? `AND ${searchText}` : "near me"
    }`;

    const data = {
      textQuery: searcQuery,
    };

    const headers = {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": API_KEY,
      "X-Goog-FieldMask": [
        "places.id",
        "places.formattedAddress",
        "places.displayName",
        "places.addressComponents",
        "places.location",
      ],
    };

    const { data: response } = await axios.post(GooglePlaceURL, data, {
      headers,
    });
    return NextResponse.json(
      {
        success: true,
        places: response.places,
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
