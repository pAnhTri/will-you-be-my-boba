"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/zustand/stores/auth";

export function AuthInitializer() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    initializeAuth().then(() => {
      console.log("Auth initialized");
    });
  }, [initializeAuth]);

  return null;
}
