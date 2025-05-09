import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Header from "@/components/Site-Header";
import Footer from "@/components/Site-Footer";
import { AuthInitializer } from "@/components/AuthInitializer";
import AiModal from "@/components/Site-Modal-AI";
import AlexAIResponse from "@/components/Site-AlexAI-Response";

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
      <body className={`antialiased flex flex-col min-h-screen`}>
        <AuthInitializer />
        <Header />
        <AiModal />
        <AlexAIResponse />
        {children}
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
