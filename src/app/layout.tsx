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
  metadataBase: new URL('https://aghatis.id'),
  title: 'Aghatis Solution | PT Aghatis Karya Indonesia — Software Development & Digital Experience',
  description: 'Aghatis Solution (PT Aghatis Karya Indonesia) membantu bisnis Anda melalui software development, AI solutions, web & mobile apps (Android/iOS), UI/UX, 3D, dan custom icons.',
  keywords: 'Aghatis, Aghatis Solution, PT Aghatis Karya Indonesia, Aghatis Karya Indonesia, software house bandung, software development, web development, mobile apps, Android, iOS, UI/UX design, artificial intelligence, AI development, 3D design, custom icons, digital solutions, custom software',
  authors: [ { name: 'PT Aghatis Karya Indonesia' }, { name: 'Aghatis Solution' } ],
  creator: 'PT Aghatis Karya Indonesia',
  publisher: 'PT Aghatis Karya Indonesia',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://aghatis.id',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://aghatis.id',
    title: 'Aghatis Solution | PT Aghatis Karya Indonesia — Software Development & Digital Experience',
    description: 'Aghatis Solution (PT Aghatis Karya Indonesia) — penyedia solusi digital: software development, AI, web & mobile apps, dan UI/UX.',
    siteName: 'PT Aghatis Karya Indonesia',
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
    title: 'Aghatis Solution | PT Aghatis Karya Indonesia',
    description: 'Software development, AI solutions, web & mobile apps, UI/UX.',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'PT Aghatis Karya Indonesia',
              legalName: 'PT Aghatis Karya Indonesia',
              url: 'https://aghatis.id',
              logo: 'https://aghatis.id/app/img/logo-light.png',
              brand: 'Aghatis Solution',
              sameAs: [ 'https://aghatis.id' ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Aghatis Solution',
              url: 'https://aghatis.id',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://aghatis.id/?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
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
