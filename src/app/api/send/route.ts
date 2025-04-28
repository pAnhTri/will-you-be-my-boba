import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import ContactEmailTemplate from "@/lib/resend/ContactEmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export const POST = async (req: NextRequest) => {
  try {
    const { email, subject, message } = await req.json();

    if (!email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Will You Be My Boba Contact Form <onboarding@resend.dev>",
      to: ["anhtp5@uci.edu"],
      subject: subject,
      react: ContactEmailTemplate({ email, message }),
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
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
