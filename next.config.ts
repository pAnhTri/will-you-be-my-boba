import type { NextConfig } from "next";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("/storage/v1/object/public/**", supabaseUrl)],
  },
};

export default nextConfig;
