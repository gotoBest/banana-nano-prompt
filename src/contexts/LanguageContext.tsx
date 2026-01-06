'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Language, translations } from '@/lib/i18n'

// Re-export Language type for convenience
export type { Language }

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: typeof translations.zh
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Detect system language and return appropriate language
function detectSystemLanguage(): Language {
  if (typeof window === 'undefined') return 'en'

  const browserLang = navigator.language || navigator.languages?.[0] || 'en'

  // Check if the browser language is Chinese (zh, zh-CN, zh-TW, zh-HK, etc.)
  if (browserLang.toLowerCase().startsWith('zh')) {
    return 'zh'
  }

  // Default to English for all other languages
  return 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Load language from localStorage or detect from system
    const saved = localStorage.getItem('language') as Language

    if (saved && (saved === 'zh' || saved === 'en')) {
      // Use saved language preference
      setLanguageState(saved)
    } else {
      // Auto-detect from system language
      const detected = detectSystemLanguage()
      setLanguageState(detected)
      localStorage.setItem('language', detected)
    }

    setIsInitialized(true)
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  const value = {
    language,
    setLanguage,
    t: translations[language],
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
