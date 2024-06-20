
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lendsqr Frontend Engineering Assessment",
  description: "Project for Lendsqr Frontend Engineering Assessment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="shortcut icon" href="/public/LendsqrIcon.ico" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
