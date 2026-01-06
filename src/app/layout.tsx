import type { Metadata } from 'next'
import { Syne, Outfit, Space_Mono } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { translations } from '@/lib/i18n'
import MetadataUpdater from '@/components/MetadataUpdater'

// Display: Bold, geometric, unforgettable headlines
const display = Syne({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['700', '800'],
})

// Body: Refined geometric sans for readability
const body = Outfit({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

// Mono: Technical font for code/elements with personality
const mono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '700'],
})

export async function generateMetadata(): Promise<Metadata> {
  // Default to English metadata, will be updated by MetadataUpdater component
  // based on user's language preference
  const enMeta = translations.en.metadata
  const zhMeta = translations.zh.metadata

  return {
    title: enMeta.title,
    description: enMeta.description,
    keywords: enMeta.keywords,
    icons: {
      icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🍌</text></svg>',
    },
    alternates: {
      languages: {
        'en': '/',
        'zh-CN': '/',
      },
    },
    openGraph: {
      title: enMeta.title,
      description: enMeta.description,
      type: 'website',
      locale: 'en_US',
      alternateLocale: 'zh_CN',
    },
    twitter: {
      card: 'summary_large_image',
      title: enMeta.title,
      description: enMeta.description,
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} ${mono.variable} font-body antialiased`}>
        <LanguageProvider>
          <MetadataUpdater />
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
