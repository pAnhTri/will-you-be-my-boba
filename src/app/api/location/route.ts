import { dbConnect } from "@/app/lib/mongodb";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const GooglePlaceURL = `https://places.googleapis.com/v1/places:searchText`;

const headers = {
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": process.env.GOOGLE_MAPS_API_KEY,
    "X-Goog-FieldMask": [
      "places.id",
      "places.formattedAddress",
      "places.displayName",
      "places.addressComponents",
    ],
  },
};

export const GET = async (req: NextRequest) => {
  await dbConnect();

  const searchParams = req.nextUrl.searchParams;
  const filter = searchParams.get("filter");

  try {
    if (filter) {
      const { range = 0, city = "" } = JSON.parse(filter);

      const query = `(boba OR tea OR cafe) ${
        range > 0 && `around ${range} miles`
      } near ${city.trim() !== "" ? city : "me"}`;

      const data = {
        textQuery: query,
      };

      const response = await axios.post(GooglePlaceURL, data, headers);

      return NextResponse.json(
        { success: true, ...response.data },
        { status: 200 }
      );
    } else {
      const response = await axios.post(
        GooglePlaceURL,
        {
          textQuery: "(boba OR tea OR cafe) near me",
        },
        headers
      );

      return NextResponse.json(
        { success: true, ...response.data },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error fetching Google Location data:", error);
    return NextResponse.json(
      { success: false, error: "Error fetching Google Location data" },
      { status: 500 }
    );
  }
};
