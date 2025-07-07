import ActiveTab from "@/components/Admin/ActiveTab";
import NotAdminMessage from "@/components/Admin/NotAdminMessage";
import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/utils/server";
import { redirect } from "next/navigation";

const Admin = async () => {
  const supabase = await createClient();

  const { data: user } = await supabase.auth.getUser();

  // Ensure user is logged in
  if (!user) {
    redirect(`/auth/login?redirectTo=${encodeURIComponent("/admin")}`);
  }

  const supabaseId = user.user?.id;

  if (!supabaseId) {
    redirect(`/auth/login?redirectTo=${encodeURIComponent("/admin")}`);
  }

  // Role check
  const userProfile = await getUser(supabaseId);

  if (userProfile?.role.toLowerCase() !== "admin") {
    return <NotAdminMessage />;
  }

  return (
    <div className="flex flex-col grow">
      <ActiveTab />
    </div>
  );
};

export default Admin;
