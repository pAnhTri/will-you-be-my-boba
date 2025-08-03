import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/utils/server";
import { redirect } from "next/navigation";
import NotAdminMessage from "@/components/Admin/NotAdminMessage";
import AdminTabs from "@/components/Admin/AdminTabs";
import { Group, Tabs, TabsList, TabsPanel } from "@mantine/core";
import DataFetchLoaders from "@/components/Admin/DataFetchLoaders";
import dynamic from "next/dynamic";
import ReportPanel from "@/components/Admin/ReportPanel";
import { Suspense } from "react";

const BobaPanel = dynamic(() => import("@/components/Admin/BobaPanel"), {
  loading: () => <DataFetchLoaders text="Loading boba panel..." />,
});

const ReportsInitializer = dynamic(
  () => import("@/components/Admin/ReportsInitializer"),
  {
    loading: () => <DataFetchLoaders text="Loading reports..." />,
  }
);

const BobaFlavorsInitializer = dynamic(
  () => import("@/components/Admin/BobaFlavorsInitializer"),
  {
    loading: () => <DataFetchLoaders text="Loading flavors..." />,
  }
);

const ShopsInitializer = dynamic(
  () => import("@/components/Admin/ShopsInitializer"),
  {
    loading: () => <DataFetchLoaders text="Loading shops..." />,
  }
);

const BobasInitiator = dynamic(
  () => import("@/components/Admin/BobasInitiator"),
  {
    loading: () => <DataFetchLoaders text="Loading bobas..." />,
  }
);

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
    <div className="full-screen">
      <Suspense
        fallback={<DataFetchLoaders text="Initializing admin data..." />}
      >
        <Group gap="xs" justify="center">
          <ReportsInitializer />
          <BobaFlavorsInitializer />
          <ShopsInitializer />
          <BobasInitiator />
        </Group>
      </Suspense>
      <Tabs
        className="grow-1 min-h-0 flex flex-col"
        defaultValue="reports"
        variant="pills"
        color="dark"
      >
        <TabsList grow p="xs">
          <AdminTabs />
        </TabsList>

        <TabsPanel value="reports" className="grow-1 min-h-0 flex flex-col">
          <ReportPanel />
        </TabsPanel>
        <TabsPanel value="boba" className="grow-1 min-h-0 flex flex-col">
          <BobaPanel />
        </TabsPanel>
      </Tabs>
    </div>
  );
};

export default Admin;
