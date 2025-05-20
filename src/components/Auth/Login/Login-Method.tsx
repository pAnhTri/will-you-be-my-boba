"use client";

import MethodTab from "./Login-MethodTab";
import LoginForm from "./Login-Form";
import { useState } from "react";
import { cn } from "@/lib/utils";
import MagicLink from "./Login-MagicLink";

const LoginMethod = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>("password");

  return (
    <>
      {/* Login Method Tab */}
      <div className="flex items-center justify-center gap-4 bg-gray-50/50 rounded-full p-1.5 mb-8">
        <MethodTab
          tab="Password"
          onClick={() => setSelectedMethod("password")}
          className={cn(
            "transition-all duration-200 ease-in-out",
            selectedMethod === "password"
              ? "bg-white shadow-sm text-primary-600"
              : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
          )}
        />
        <MethodTab
          tab="Magic Link"
          onClick={() => setSelectedMethod("magic-link")}
          className={cn(
            "transition-all duration-200 ease-in-out",
            selectedMethod === "magic-link"
              ? "bg-white shadow-sm text-primary-600"
              : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
          )}
        />
      </div>

      {/* Login Form */}
      {selectedMethod === "password" && <LoginForm />}
      {selectedMethod === "magic-link" && <MagicLink />}
    </>
  );
};

export default LoginMethod;
