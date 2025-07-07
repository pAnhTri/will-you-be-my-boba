import { ReportDocument } from "@/lib/mongodb/models/Report";
import { ReportTabConfig } from "@/types";
import {
  LuClipboardList,
  LuFlaskConical,
  LuStore,
  LuCoffee,
  LuTriangle,
  LuCheck,
} from "react-icons/lu";

export const createTabConfigs = (
  reports: Record<string, ReportDocument[]>
): ReportTabConfig[] => {
  return [
    {
      value: "all",
      label: "All",
      icon: <LuClipboardList size={16} />,
      color: "blue",
      count: reports.all?.length ?? 0,
    },
    {
      value: "flavor",
      label: "Flavor",
      icon: <LuFlaskConical size={16} />,
      color: "green",
      count: reports.flavor?.length ?? 0,
    },
    {
      value: "shop",
      label: "Shop",
      icon: <LuStore size={16} />,
      color: "orange",
      count: reports.shop?.length ?? 0,
    },
    {
      value: "boba",
      label: "Boba",
      icon: <LuCoffee size={16} />,
      color: "purple",
      count: reports.boba?.length ?? 0,
    },
    {
      value: "other",
      label: "Other",
      icon: <LuTriangle size={16} />,
      color: "red",
      count: reports.other?.length ?? 0,
    },
    {
      value: "solved",
      label: "Solved",
      icon: <LuCheck size={16} />,
      color: "gray",
      count: reports.solved?.length ?? 0,
    },
  ];
};
