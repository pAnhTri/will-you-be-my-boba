"use client";

import { useRef } from "react";
import { UnstyledButton, FloatingIndicator } from "@mantine/core";
import { cn, getIndicatorColorClass, getTabColorClasses } from "@/lib/utils";
import { useAdminStore } from "@/lib/zustand/stores/admin";

const tabs = ["All", "Bobas", "Flavors", "Shops", "Others", "Solved"];

const ActiveReportPanelTabs = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  const activeReportTab = useAdminStore((state) => state.activeReportTab);
  const setActiveReportTab = useAdminStore((state) => state.setActiveReportTab);

  const setControlRef = (tab: string) => (node: HTMLButtonElement | null) => {
    refs.current[tab] = node;
  };

  return (
    <div
      ref={rootRef}
      className="relative inline-flex bg-gray-100 border border-gray-200 rounded-md p-1 gap-1"
    >
      {tabs.map((tab) => {
        const isActive = activeReportTab === tab.toLowerCase();

        return (
          <UnstyledButton
            key={tab}
            ref={setControlRef(tab.toLowerCase())}
            onClick={() =>
              setActiveReportTab(
                tab.toLowerCase() as
                  | "all"
                  | "flavors"
                  | "shops"
                  | "bobas"
                  | "others"
                  | "solved"
              )
            }
            className={getTabColorClasses(tab, isActive)}
          >
            <span className="relative z-10">{tab}</span>
          </UnstyledButton>
        );
      })}

      <FloatingIndicator
        parent={rootRef.current}
        target={refs.current[activeReportTab]}
        className={cn(
          "absolute z-0 rounded-md transition-all duration-300 ease-in-out",
          getIndicatorColorClass(activeReportTab)
        )}
      />
    </div>
  );
};

export default ActiveReportPanelTabs;
