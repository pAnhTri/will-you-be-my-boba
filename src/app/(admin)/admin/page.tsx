import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/utils/server";
import { redirect } from "next/navigation";
import NotAdminMessage from "@/components/Admin/NotAdminMessage";
import AdminTabs from "@/components/Admin/AdminTabs";
import { Suspense } from "react";
import { Group } from "@mantine/core";
import { getBobaFlavors, getReports, getShops } from "@/lib/utils/actions";
import DataFetchLoaders from "@/components/Admin/DataFetchLoaders";
import ReportsFetcher from "@/components/Admin/ReportsFetcher";
import BobaFlavorsFetcher from "@/components/Admin/BobaFlavorsFetcher";
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

  // Fire the fetchers
  const reportsPromise = getReports();
  const flavorsPromise = getBobaFlavors();
  const shopsPromise = getShops();

  return (
    <>
      <div className="full-screen">
        <Group gap="xs" justify="center">
          <Suspense fallback={<DataFetchLoaders text="Loading reports..." />}>
            <ReportsFetcher reportsPromise={reportsPromise} />
          </Suspense>

          <Suspense fallback={<DataFetchLoaders text="Loading flavors..." />}>
            <BobaFlavorsFetcher flavorsPromise={flavorsPromise} />
          </Suspense>

          <Suspense fallback={<DataFetchLoaders text="Loading shops..." />}>
            <ShopsFetcher shopsPromise={shopsPromise} />
          </Suspense>
        </Group>
        <AdminTabs />
      </div>
    </>
  );
};

export default Admin;
