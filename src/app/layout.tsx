import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Will You Be My Boba",
  description: "Find bobas near you and satisfy your cravings!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased p-2 min-h-screen w-screen`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
