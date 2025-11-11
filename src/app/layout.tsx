import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono as GeistMono, Plus_Jakarta_Sans as PlusJakartaSans } from 'next/font/google';
// import { Analytics } from '@vercel/analytics/react';
// import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import SmoothScrollProvider from './components/smooth-scroll-provider';
import './lib/ssr-localstorage';
import ChatWidget from './components/ChatWidget';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: [ 'latin' ],
});

const geistMono = GeistMono({
  variable: '--font-geist-mono',
  subsets: [ 'latin' ],
});

const plusJakartaSans = PlusJakartaSans({
  variable: '--font-plus-jakarta-sans',
  subsets: [ 'latin' ],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://aghatis.com'),
  title: 'Aghatis Solution - Digital Experience & Software Development',
  description: 'Elevate your digital experience with Aghatis Solution. We specialize in custom software development, AI solutions, web development, mobile apps (Android & iOS), UI/UX design, 3D design, and custom icons.',
  keywords: 'software development, web development, mobile apps, Android, iOS, UI/UX design, artificial intelligence, AI development, 3D design, custom icons, digital solutions, custom software',
  authors: [ { name: 'Aghatis Solution' } ],
  creator: 'Aghatis Solution',
  publisher: 'Aghatis Solution',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aghatis.com',
    title: 'Aghatis Solution - Digital Experience & Software Development',
    description: 'Elevate your digital experience with Aghatis Solution. We specialize in custom software development, AI solutions, web development, mobile apps, and UI/UX design.',
    siteName: 'Aghatis Solution',
    images: [
      {
        url: '/app/img/cover.png',
        width: 1200,
        height: 600,
        alt: 'Aghatis Solution - Digital Experience',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aghatis Solution - Digital Experience & Software Development',
    description: 'Elevate your digital experience with custom software development, AI solutions, web & mobile apps, UI/UX design.',
    images: [ '/app/img/cover.png' ],
  },
  category: 'technology',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#00A06A',
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#00A06A" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Aghatis Solution" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${plusJakartaSans.variable} antialiased`}
      >
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
        <ChatWidget />
        {/* Analytics disabled during debug to avoid SSR localStorage issues */}
      </body>
    </html>
  );
}
