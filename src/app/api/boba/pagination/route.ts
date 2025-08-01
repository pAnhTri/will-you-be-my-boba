import { Boba, dbConnect } from "@/lib/mongodb";
import { getBobaPipelineStages } from "@/lib/utils";
import { PopulatedBoba } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest
): Promise<NextResponse<{ bobas: PopulatedBoba[] } | { message: string }>> => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const q = searchParams.get("q") || "";
    const limit = Number(searchParams.get("limit")) || 20;
    const page = Number(searchParams.get("page")) || 0;
    const sort = searchParams.get("sort") || "name";
    const sortOrder: "asc" | "desc" =
      searchParams.get("sortOrder") === "desc" ? "desc" : "asc";
    const flavors = searchParams.get("flavors") || "";

    await dbConnect();

    const bobasAggreation = await Boba.aggregate<PopulatedBoba>(
      getBobaPipelineStages(q, page, limit, sort, sortOrder, flavors)
    );

    return NextResponse.json(
      {
        bobas: bobasAggreation,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
};
