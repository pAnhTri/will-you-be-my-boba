"use client";

import { Tabs } from "@mantine/core";
import React from "react";
import ReportPanel from "./ReportPanel";

const AdminTabs = () => {
  return (
    <Tabs
      className="grow-1 min-h-0 flex flex-col"
      defaultValue="reports"
      variant="pills"
      color="dark"
    >
      <Tabs.List grow p="xs">
        <Tabs.Tab value="reports">Reports</Tabs.Tab>
        <Tabs.Tab value="boba" color="blue">
          Boba
        </Tabs.Tab>
        <Tabs.Tab value="shops" color="red">
          Shops
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="reports" className="grow-1 min-h-0 flex flex-col">
        <ReportPanel />
      </Tabs.Panel>
      <Tabs.Panel value="boba" className="h-full p-2">
        Boba
      </Tabs.Panel>
      <Tabs.Panel value="shops" className="h-full p-2">
        Shops
      </Tabs.Panel>
    </Tabs>
  );
};

export default AdminTabs;
