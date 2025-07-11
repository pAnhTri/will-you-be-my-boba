import { dbConnect, Report } from "@/lib/mongodb";
import { ReportDocument } from "@/lib/mongodb/models/Report";
import { reportDocumentValidatorSchema } from "@/lib/validators/report";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ param: string }> }
) => {
  try {
    await dbConnect();

    const { param } = await params;

    const reports = await Report.find({
      type: { $regex: param, $options: "i" },
    }).populate("shop");

    return NextResponse.json(reports);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ param: string }> }
): Promise<
  NextResponse<
    | { message: string }
    | { report: ReportDocument }
    | { success: false; message: string }
  >
> => {
  try {
    await dbConnect();

    const { param } = await params;

    const { comment, type, boba, shop } = await req.json();

    if (Object.keys({ comment, type, boba, shop }).length === 0) {
      return NextResponse.json(
        { message: "No fields to update" },
        { status: 400 }
      );
    }

    const validatedPayload = reportDocumentValidatorSchema.partial().safeParse({
      comment,
      reportType: type,
      boba,
      shop,
    });

    if (!validatedPayload.success) {
      return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
    }

    const report = await Report.findByIdAndUpdate(param, {
      $set: { comment, type, boba, shop },
    });

    if (!report) {
      return NextResponse.json(
        { message: "Report not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(report);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
