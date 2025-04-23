import React from "react";

const HomeCardsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="h-[400px] rounded-lg bg-gray-100 animate-pulse"></div>
      <div className="h-[400px] rounded-lg bg-gray-100 animate-pulse"></div>
      <div className="h-[400px] rounded-lg bg-gray-100 animate-pulse"></div>
    </div>
  );
};

export default HomeCardsSkeleton;
