import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppContext from "./utils/AppContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "I am tracking you",
  description: "I am tracking you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{
        <AppContext>{children}</AppContext>}</body>
    </html>
  );
}
