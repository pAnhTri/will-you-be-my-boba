import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("/storage/v1/object/public/**", supabaseUrl)],
  },
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(nextConfig);
