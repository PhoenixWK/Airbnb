import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import React from "react";
import Providers from "@/app/providers";
import {ClerkProvider} from "@clerk/nextjs";

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
  title: "AirBnb",
  description: "Created by PhoenixWK",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <ClerkProvider signInFallbackRedirectUrl="/profile/create">
          <html lang="en" suppressHydrationWarning={true}>
          <body
              className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
          <Providers>
              <Navbar/>
              <main>{children}</main>
          </Providers>
          </body>
          </html>
      </ClerkProvider>
  );
}
