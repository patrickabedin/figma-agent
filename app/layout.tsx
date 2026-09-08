import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "greek"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Car Rental, Athens Airport and Greek Islands | Avance",
  description:
    "Avance rent a car is by your side. Check, click, pay, start your journey to Greek Summer. Pickup at airports, ports, and hotel desks across Greece.",
  icons: { icon: "/brand/favicon.webp" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-wash font-sans text-ink">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
