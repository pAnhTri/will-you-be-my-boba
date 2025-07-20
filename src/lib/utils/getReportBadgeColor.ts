export const getReportBadgeColor = (type: string): string => {
  switch (type.toLowerCase()) {
    case "shop":
      return "orange";
    case "flavor":
      return "green";
    case "name":
      return "purple";
    case "other":
      return "red";
    case "solved":
      return "gray";
    default:
      return "blue";
  }
};
