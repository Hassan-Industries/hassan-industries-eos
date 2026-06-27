import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hassan Industries EOS",
  description: "Hassan Industries Enterprise Operating System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <html lang="en" suppressHydrationWarning><body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} bg-[#eaf0f5] text-[#050816] antialiased`}><div className="min-h-screen bg-[#eaf0f5]"><Sidebar /><div className="min-h-screen lg:pl-[280px]"><Topbar /><main className="min-h-[calc(100vh-88px)] bg-[#eaf0f5] px-4 py-6 sm:px-6 lg:px-8">{children}</main></div></div></body></html>;
}