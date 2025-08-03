"use client";

import { useBobasPagination, useReports } from "@/lib/utils/hooks";
import { TabsTab } from "@mantine/core";
import React from "react";

const AdminTabs = () => {
  const { reports } = useReports();
  const { bobas } = useBobasPagination("", 20, "name", "asc", "", false);

  return (
    <>
      <TabsTab value="reports" disabled={!reports}>
        Reports
      </TabsTab>
      <TabsTab value="boba" color="blue" disabled={!bobas}>
        Boba
      </TabsTab>
    </>
  );
};

export default AdminTabs;
