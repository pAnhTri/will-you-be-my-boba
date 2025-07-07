"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const NotAdminMessage = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-4">
          You don&apos;t have admin privileges to access this page.
        </p>
        <p className="text-sm text-gray-500">
          Redirecting to home page in 3 seconds...
        </p>
      </div>
    </div>
  );
};

export default NotAdminMessage;
