import type { Metadata } from "next";
import "../globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Share Your Profile | Will You Be My Boba",
  description: "Share your profile with others",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased flex flex-col min-h-screen`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
