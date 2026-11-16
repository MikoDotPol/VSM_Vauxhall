import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DebugConsole from "@/components/DebugConsole";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Умный вокзал ВСМ",
  description: "Платформа-оркестратор",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        {children}
        <DebugConsole />
      </body>
    </html>
  );
}
