export const getIndicatorColorClass = (tab: string) => {
  switch (tab.toLowerCase()) {
    case "all":
      return "bg-blue-500";
    case "bobas":
      return "bg-purple-500";
    case "flavors":
      return "bg-green-500";
    case "shops":
      return "bg-orange-500";
    case "others":
      return "bg-red-500";
    case "solved":
      return "bg-gray-500";
    default:
      return "bg-blue-500";
  }
};
