"use server";

import { dbConnect } from "@/lib/mongodb";
import Report, { ReportDocument } from "@/lib/mongodb/models/Report";
import {
  ReportDocumentInput,
  reportDocumentValidatorSchema,
} from "@/lib/validators/report";
import { FilterQuery } from "mongoose";

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

export const updateReport = async (
  reportUpdateCondition: FilterQuery<ReportDocument>,
  payload: Partial<ReportDocument>
): Promise<ReportDocument> => {
  try {
    if (Object.keys(payload).length === 0) {
      throw new Error("No payload provided");
    }

    const sanitizedPayload: Partial<ReportDocumentInput> = {
      reportType: payload.type,
      boba: payload.boba,
      shop: payload.shop?.toString(),
      comment: payload.comment?.toString(),
    };

    // payload validation
    const validatedPayload = reportDocumentValidatorSchema
      .partial()
      .safeParse(sanitizedPayload);

    if (!validatedPayload.success) {
      throw new Error(validatedPayload.error.message);
    }

    await dbConnect();

    const report = await Report.findOneAndUpdate<ReportDocument>(
      reportUpdateCondition,
      payload,
      { new: true }
    );

    if (!report) {
      throw new Error("Report not found");
    }

    return JSON.parse(JSON.stringify(report));
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to update report"
    );
  }
};

export const updateManyReports = async (
  reportUpdateCondition: FilterQuery<ReportDocument>,
  payload: Partial<ReportDocument>
): Promise<void> => {
  try {
    if (Object.keys(payload).length === 0) {
      throw new Error("No payload provided");
    }

    const sanitizedPayload: Partial<ReportDocumentInput> = {
      reportType: payload.type,
      boba: payload.boba,
      shop: payload.shop?.toString(),
      comment: payload.comment?.toString(),
    };

    // payload validation
    const validatedPayload = reportDocumentValidatorSchema
      .partial()
      .safeParse(sanitizedPayload);

    if (!validatedPayload.success) {
      throw new Error(validatedPayload.error.message);
    }

    await dbConnect();

    await Report.updateMany(reportUpdateCondition, validatedPayload.data);
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to update many reports"
    );
  }
};
