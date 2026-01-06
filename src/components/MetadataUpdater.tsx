'use client'

import { useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/lib/i18n'

export default function MetadataUpdater() {
  const { language } = useLanguage()

  useEffect(() => {
    const meta = translations[language].metadata

    // Update document title
    document.title = meta.title

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.setAttribute('name', 'description')
      document.head.appendChild(metaDescription)
    }
    metaDescription.setAttribute('content', meta.description)

    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]')
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta')
      metaKeywords.setAttribute('name', 'keywords')
      document.head.appendChild(metaKeywords)
    }
    metaKeywords.setAttribute('content', meta.keywords.join(', '))

    // Update Open Graph tags
    const updateOGTag = (property: string, content: string) => {
      let ogTag = document.querySelector(`meta[property="${property}"]`)
      if (!ogTag) {
        ogTag = document.createElement('meta')
        ogTag.setAttribute('property', property)
        document.head.appendChild(ogTag)
      }
      ogTag.setAttribute('content', content)
    }

    updateOGTag('og:title', meta.title)
    updateOGTag('og:description', meta.description)
    updateOGTag('og:locale', language === 'zh' ? 'zh_CN' : 'en_US')

    // Update Twitter Card tags
    const updateTwitterTag = (name: string, content: string) => {
      let twitterTag = document.querySelector(`meta[name="${name}"]`)
      if (!twitterTag) {
        twitterTag = document.createElement('meta')
        twitterTag.setAttribute('name', name)
        document.head.appendChild(twitterTag)
      }
      twitterTag.setAttribute('content', content)
    }

    updateTwitterTag('twitter:title', meta.title)
    updateTwitterTag('twitter:description', meta.description)

    // Update html lang attribute
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en'
  }, [language])

  return null
}

