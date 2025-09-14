"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";
import UnauthenticatedLayout from "@src/layouts/unauthenticated";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import AuthenticatedLayout from "@src/layouts/authenticated";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAuthRoute = pathname.startsWith("/auth");
  const [queryClient] = useState(() => new QueryClient());
  const publicRoutes = [
    "/",
    "/about",
    "/findApartments",
    "/contact",
    "/auth",
    "/auth/login",
    "/auth/verify",
    "/auth/register",
    "/auth/forgot-password",
    "/auth/new-password",
  ];
  const isPublicRoute = publicRoutes.includes(pathname);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProvider client={queryClient}>
          <Toaster position="top-right" richColors duration={2000} />
          {isPublicRoute ? (
            <UnauthenticatedLayout>{children}</UnauthenticatedLayout>
          ) : (
            <AuthenticatedLayout>{children}</AuthenticatedLayout>
          )}
        </QueryClientProvider>
      </body>
    </html>
  );
}
