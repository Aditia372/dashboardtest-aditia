// File: src/app/layout.tsx

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// 1. Import AuthProvider
import { AuthProvider } from "@/context/AuthContext";

// Konfigurasi font lokal Anda
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Product Dashboard",
  description: "Technical Test for SGT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* 2. Pastikan AuthProvider membungkus {children} */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
