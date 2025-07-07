"use client";

import { useAdminStore } from "@/lib/zustand/stores";
import { Tabs } from "@mantine/core";
import ReportPanel from "./ReportPanel";

const ActiveTab = () => {
  const activeTab = useAdminStore((state) => state.activeTab);
  const setActiveTab = useAdminStore((state) => state.setActiveTab);

  return (
    <Tabs
      value={activeTab}
      onChange={(value) => setActiveTab(value as "reports" | "shops" | "boba")}
      variant="pills"
      classNames={{
        root: "flex flex-col grow",
        list: "p-4",
      }}
      keepMounted={false}
    >
      <Tabs.List justify="center">
        <Tabs.Tab value="reports">Reports</Tabs.Tab>
        <Tabs.Tab value="shops">Shops</Tabs.Tab>
        <Tabs.Tab value="boba">Boba</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="reports" className="flex flex-col grow">
        <ReportPanel />
      </Tabs.Panel>
      <Tabs.Panel value="shops">Shops</Tabs.Panel>
      <Tabs.Panel value="boba">Boba</Tabs.Panel>
    </Tabs>
  );
};

export default ActiveTab;
