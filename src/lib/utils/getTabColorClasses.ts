import { cn } from "./cn";

export const getTabColorClasses = (tab: string, isActive: boolean) => {
  const baseClasses =
    "relative z-10 px-3 py-2 rounded-md font-medium text-sm transition-colors duration-200 ease-in-out cursor-pointer";
  const textClasses = isActive ? "text-white" : "text-gray-700";

  switch (tab.toLowerCase()) {
    case "all":
      return cn(
        baseClasses,
        textClasses,
        "hover:text-white hover:bg-blue-500",
        isActive ? "bg-blue-500" : "bg-transparent"
      );
    case "bobas":
      return cn(
        baseClasses,
        textClasses,
        "hover:text-white hover:bg-purple-500",
        isActive ? "bg-purple-500" : "bg-transparent"
      );
    case "flavors":
      return cn(
        baseClasses,
        textClasses,
        "hover:text-white hover:bg-green-500",
        isActive ? "bg-green-500" : "bg-transparent"
      );
    case "shops":
      return cn(
        baseClasses,
        textClasses,
        "hover:text-white hover:bg-orange-500",
        isActive ? "bg-orange-500" : "bg-transparent"
      );
    case "others":
      return cn(
        baseClasses,
        textClasses,
        "hover:text-white hover:bg-red-500",
        isActive ? "bg-red-500" : "bg-transparent"
      );
    case "solved":
      return cn(
        baseClasses,
        textClasses,
        "hover:text-white hover:bg-gray-500",
        isActive ? "bg-gray-500" : "bg-transparent"
      );
    default:
      return cn(
        baseClasses,
        textClasses,
        "hover:text-white hover:bg-blue-500",
        isActive ? "bg-blue-500" : "bg-transparent"
      );
  }
};
