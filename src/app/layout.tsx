import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="max-w-6xl mx-auto p-4">
          <Navbar />
          <div className="mt-8">{children}</div>
        </div>
      </body>
    </html>
  );
}
