import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";

import { cn } from "@/shared/lib/utils";
import { Providers } from "@/shared/providers";

import "./globals.scss";

const jetBrainsMono = JetBrains_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CoolShop | Магазин техники",
  description: "Бытовая техника по низким ценам с доставкойь по стране.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(jetBrainsMono.className)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
