"use server";

import { dbConnect } from "@/lib/mongodb";
import Report, { ReportDocument } from "@/lib/mongodb/models/Report";

export const getReports = async (): Promise<ReportDocument[]> => {
  try {
    await dbConnect();

    const reports = await Report.find<ReportDocument>({});

    //DEBUG
    // throw new Error("test");
    return JSON.parse(JSON.stringify(reports));
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch reports"
    );
  }
};

export const getReportsLimited = async (
  limit: number
): Promise<ReportDocument[]> => {
  try {
    await dbConnect();

    const reports = await Report.find<ReportDocument>({})
      .limit(limit)
      .sort({ createdAt: -1 });

    return JSON.parse(JSON.stringify(reports));
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch reports limited"
    );
  }
};
