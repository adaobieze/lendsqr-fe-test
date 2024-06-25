import React from 'react';
import Providers from "./providers";
import type { Metadata } from "next";
import { Work_Sans, Roboto } from "next/font/google";
import localFont from "next/font/local";
import "@/styles/globals.scss";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: '--font-work-sans',
});

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ["latin"],
  variable: '--font-roboto',
});

const avenirNext = localFont({
  src: [
    {
      path: '../../public/fonts/AvenirNext-WebFont/AvenirNext-Regular/AvenirNext-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/AvenirNext-WebFont/AvenirNext-Italic/AvenirNext-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/AvenirNext-WebFont/AvenirNext-Medium/AvenirNext-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/AvenirNext-WebFont/AvenirNext-DemiBold/AvenirNext-DemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-avenir-next',
});

const sfCompact = localFont({
  src: [
    {
      path: '../../public/fonts/SF-Compact-Display/SF-Compact-Display-Medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/SF-Compact-Display/SF-Compact-Display-Thin.woff',
      weight: '100',
      style: 'normal',
    },
  ],
  variable: '--font-sf-compact',
});

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
    <html lang="en" suppressHydrationWarning className={`${workSans.variable} ${avenirNext.variable} ${roboto.variable} ${sfCompact.variable}`}>
      <head>
        <link rel="shortcut icon" href="/public/brand-assets/LendsqrIcon.ico" />
      </head>
      <body className={`${workSans.variable}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}