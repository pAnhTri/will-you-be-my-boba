import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const location = body.location;

    if (!location || typeof location !== "string") {
      return NextResponse.json(
        { success: false, message: "Location must be a string" },
        { status: 400 }
      );
    }

    const formattedLocation = location.replace(/\s+/g, "+");

    const geocodingURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${formattedLocation}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;

    const { data } = await axios.get(geocodingURL);

    if (data.results.length === 0) {
      return NextResponse.json(
        { success: false, message: "Location not found" },
        { status: 404 }
      );
    }

    const { lat, lng } = data.results[0].geometry.location;

    return NextResponse.json(
      {
        success: true,
        location: {
          latitude: lat,
          longitude: lng,
        },
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
