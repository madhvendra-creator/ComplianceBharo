import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ChatWidget from "./components/ChatWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://compliancebharo.com'),
  applicationName: 'Compliance Bharo',
  title: {
    default: 'Compliance Bharo',
    template: '%s | Compliance Bharo'
  },
  description: 'Fast Track Compliance Services in India',
  keywords: ['company registration', 'GST registration', 'trademark registration', 'ROC compliance', 'ISO certification', 'startup india', 'MSME registration', 'accounting services', 'taxation India', 'Compliance Bharo'],
  authors: [{ name: 'Compliance Bharo', url: 'https://compliancebharo.com' }],
  creator: 'Compliance Bharo',
  publisher: 'Compliance Bharo',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://compliancebharo.com',
    title: 'Compliance Bharo',
    description: 'Fast Track Compliance Services in India',
    siteName: 'Compliance Bharo',
    images: [{
      url: '/icon.png',
      width: 1200,
      height: 630,
      alt: 'Compliance Bharo Logo',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compliance Bharo',
    description: 'Fast Track Compliance Services in India',
    creator: '@compliancebharo',
    images: ['/icon.png'],
  },
  appleWebApp: {
    capable: true,
    title: 'Compliance Bharo',
    statusBarStyle: 'default',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  manifest: '/manifest.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://compliancebharo.com/#organization',
        name: 'Compliance Bharo',
        url: 'https://compliancebharo.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://compliancebharo.com/logo.png',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+91-9876543210', // Placeholder
          contactType: 'customer service',
          areaServed: 'IN',
          availableLanguage: ['en', 'hi'],
        },
      },
      {
        '@type': 'WebSite',
        '@id': 'https://compliancebharo.com/#website',
        url: 'https://compliancebharo.com',
        name: 'Compliance Bharo',
        publisher: {
          '@id': 'https://compliancebharo.com/#organization',
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://compliancebharo.com/search?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'LocalBusiness',
        '@id': 'https://compliancebharo.com/#localbusiness',
        name: 'Compliance Bharo',
        url: 'https://compliancebharo.com',
        telephone: '+91-9876543210',
        priceRange: '₹₹',
        image: 'https://compliancebharo.com/logo.png',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Business Center',
          addressLocality: 'New Delhi',
          addressRegion: 'DL',
          postalCode: '110001',
          addressCountry: 'IN',
        },
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
