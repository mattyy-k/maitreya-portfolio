import type { Metadata } from "next";
import { CapabilityProvider, PerformanceInstrumentation, ScrollProgressProvider } from "@/components/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Maitreya Kulkarni | Systems software, AI, infrastructure",
  description: "Maitreya Kulkarni builds systems that make difficult things possible.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body><CapabilityProvider><ScrollProgressProvider><PerformanceInstrumentation />{children}</ScrollProgressProvider></CapabilityProvider></body>
    </html>
  );
}