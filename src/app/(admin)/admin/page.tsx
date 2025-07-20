import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/utils/server";
import { redirect } from "next/navigation";
import NotAdminMessage from "@/components/Admin/NotAdminMessage";
import AdminTabs from "@/components/Admin/AdminTabs";
import { Suspense } from "react";
import FlavorFetcher from "@/components/Admin/FlavorFetcher";
import { Center, Group, Loader, Text } from "@mantine/core";
import DataFetchLoaders from "@/components/Admin/DataFetchLoaders";
import ShopsFetcher from "@/components/Admin/ShopsFetcher";

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
    <>
      <div className="full-screen">
        <Group gap="xs" justify="center">
          <Suspense fallback={<DataFetchLoaders text="Loading flavors..." />}>
            <FlavorFetcher />
          </Suspense>
          <Suspense fallback={<DataFetchLoaders text="Loading shops..." />}>
            <ShopsFetcher />
          </Suspense>
        </Group>
        <AdminTabs />
      </div>
    </>
  );
};

export default Admin;
