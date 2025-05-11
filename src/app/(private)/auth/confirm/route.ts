import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getSessionPayload } from "@/lib/jwt/server";
import { dbConnect } from "@/lib/mongodb";
import User from "@/lib/mongodb/models/User";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";

  if (token_hash && type) {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (!error) {
      const session = data.session;

      if (session) {
        const token = session.access_token;
        const sessionPayload = await getSessionPayload(token);

        // Once confirmed, create a user in the database
        await dbConnect();
        const user = await User.findOne({ supabaseId: sessionPayload?.sub });

        if (!user) {
          await User.create({
            supabaseId: sessionPayload?.sub,
            email: sessionPayload?.email,
          });
        }
      }

      // redirect user to specified redirect URL or root of app
      redirect(next);
    }
  }

  // redirect the user to an error page with some instructions
  redirect("/error");
}
