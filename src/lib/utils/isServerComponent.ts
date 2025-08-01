export const isServerComponent = () => {
  return typeof window === "undefined";
};
