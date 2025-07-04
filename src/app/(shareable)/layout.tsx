import type { Metadata } from "next";
import "@mantine/core/styles.css";
import "../globals.css";
import { Analytics } from "@vercel/analytics/react";
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";

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
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`antialiased flex flex-col min-h-screen`}>
        <MantineProvider>
          {children}
          <Analytics />
        </MantineProvider>
      </body>
    </html>
  );
}
