import type { Metadata } from "next";
import "../globals.css";
import { Analytics } from "@vercel/analytics/react";
import Header from "@/components/Site-Header";
import Footer from "@/components/Site-Footer";
import { AuthInitializer } from "@/components/AuthInitializer";
import AiModal from "@/components/Site-Modal-AI";
import AlexAIResponse from "@/components/Site-AlexAI-Response";
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";

export const metadata: Metadata = {
  title: {
    default: "Will You Be My Boba",
    template: "%s | Will You Be My Boba",
  },
  description:
    "The best way to find your next favorite boba drink and where to get it!",
  alternates: {
    canonical: "https://will-you-be-my-boba.com",
  },
  keywords: [
    // Core terms
    "boba",
    "bubble tea",
    "milk tea",
    "boba drink",
    "boba shop",
    "boba cafe",
    "boba store",

    // App & Finder Specific
    "boba finder app",
    "boba locator app",
    "bubble tea finder app",
    "boba shop finder app",
    "boba app",
    "bubble tea app",
    "boba discovery app",
    "boba shop locator app",
    "find boba app",
    "boba shop finder",
    "boba locator",
    "boba finder",
    "bubble tea finder",
    "boba shop locator",
    "bubble tea locator",

    // Location-based
    "boba near me",
    "bubble tea near me",
    "boba shop near me",
    "best boba near me",
    "boba places near me",

    // Action-based
    "find boba",
    "find bubble tea",
    "find boba shop",
    "find boba near me",
    "find best boba",

    // Community & Social
    "boba community",
    "boba lovers",
    "boba enthusiasts",
    "share boba",
    "boba recommendations",

    // Specific Types
    "taro boba",
    "brown sugar boba",
    "fruit tea boba",
    "jasmine milk tea",
    "pearl milk tea",

    // Long-tail Keywords
    "best boba shop near me",
    "where to find good boba",
    "boba shop finder",
    "bubble tea finder",
    "boba drink finder",
    "boba shop locator",
    "bubble tea locator",

    // Reviews & Ratings
    "boba shop reviews",
    "bubble tea reviews",
    "best boba drinks",
    "top boba shops",
    "rated boba shops",

    // Features
    "boba customization",
    "boba toppings",
    "boba flavors",
    "boba menu",
    "boba prices",
  ],
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
          <AuthInitializer />
          <Header />
          <AiModal />
          <AlexAIResponse />
          {children}
          <Analytics />
          <Footer />
        </MantineProvider>
      </body>
    </html>
  );
}
