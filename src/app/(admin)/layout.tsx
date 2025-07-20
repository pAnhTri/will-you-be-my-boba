import type { Metadata } from "next";
import "@mantine/core/styles.css";
import "../globals.css";
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";

export const metadata: Metadata = {
  title: "Admin | Will You Be My Boba",
  description: "Admin dashboard for Will You Be My Boba",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript suppressHydrationWarning />
      </head>
      <body className={`antialiased`}>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
