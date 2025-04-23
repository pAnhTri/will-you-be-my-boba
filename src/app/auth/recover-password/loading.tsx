import React from "react";

const RecoverPasswordLoading = () => {
  return (
    <>
      {/* Title Skeleton */}
      <div className="text-center mb-6">
        <div className="h-8 w-48 bg-gray-200 rounded mx-auto mb-2 animate-pulse"></div>
        <div className="h-4 w-64 bg-gray-200 rounded mx-auto animate-pulse"></div>
      </div>

      {/* Form Fields Skeleton */}
      <div className="space-y-4">
        <div>
          <div className="h-4 w-24 bg-gray-200 rounded mb-2 animate-pulse"></div>
          <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
        </div>

        <div>
          <div className="h-4 w-32 bg-gray-200 rounded mb-2 animate-pulse"></div>
          <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Button Skeleton */}
        <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Signup Link Skeleton */}
      <div className="text-center mt-4">
        <div className="h-4 w-48 bg-gray-200 rounded mx-auto animate-pulse"></div>
      </div>
    </>
  );
};

export default RecoverPasswordLoading;
