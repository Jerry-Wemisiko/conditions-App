import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Configure the Inter font
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Weather App",
  description: "Weather forecast application",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}