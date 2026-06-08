import type { Metadata } from "next";
import { Encode_Sans, Manrope } from "next/font/google";

import { AppShell } from "@/components/layout/AppShell";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

const encodeSans = Encode_Sans({
  variable: "--font-balance",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fintrack — Budget tracking",
  description:
    "Responsive web app for balance visibility, envelope budgeting, and spending insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${encodeSans.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">
        <TooltipProvider>
          <AppShell>{children}</AppShell>
        </TooltipProvider>
      </body>
    </html>
  );
}
