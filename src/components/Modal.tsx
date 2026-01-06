'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { PromptItem } from '@/types'
import { useLanguage } from '@/contexts/LanguageContext'
import { audio } from 'framer-motion/client'

interface ModalProps {
  item: PromptItem | null
  onClose: () => void
}

// ModalImage component with lazy loading
function ModalImage({ src, alt }: { src: string; alt: string }) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div className="relative w-full rounded-xl overflow-hidden bg-purple-900/30 border border-white/10 pointer-events-auto">
      {/* Skeleton placeholder with shimmer effect */}
      {!imageLoaded && (
        <div className="absolute inset-0 skeleton-shimmer min-h-[300px] flex items-center justify-center">
          <div className="text-4xl text-purple-400/40">🎨</div>
        </div>
      )}

      <Image
        src={src}
        alt={alt}
        width={0}
        height={0}
        style={{width: '100%', height: 'auto'}}
        className={`object-contain transition-opacity duration-300 hover:scale-105 transition-transform duration-500 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        sizes="(max-width: 640px) 100vw, 50vw"
        loading="lazy"
        onLoad={() => setImageLoaded(true)}
      />
    </div>
  )
}

export default function Modal({ item, onClose }: ModalProps) {
  const { t, language } = useLanguage()
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  // 根据语言选择标题
  const displayTitle = item && language === 'en' && item.title_en ? item.title_en : item?.title

  // Lock body scroll when modal is open
  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [item])

  if (!item) return null

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleCopy = async (prompt: string, index: number) => {
    await navigator.clipboard.writeText(prompt)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={handleBackdropClick}
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-xl overflow-y-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.175, 0.885, 0.32, 1.275] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl my-4 sm:my-8"
        >
          <div className="glass-card neon-glow overflow-hidden">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/80 hover:scale-110 transition-all"
              aria-label={t.close}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-white/10 bg-gradient-to-r from-banana-400/10 via-neon-pink/10 to-neon-purple/10">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-lg bg-banana-400/20 border border-banana-400/30">
                  <span className="font-display font-bold text-sm text-banana-400 tracking-tight">#{item.id}</span>
                </span>
                <span className="px-3 py-1 rounded-lg bg-neon-purple/20 border border-neon-purple/30 text-xs text-neon-purple font-medium whitespace-nowrap font-mono tracking-wide">
                  {item.model || t.nanoBananaPro}
                </span>
              </div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-3 leading-tight tracking-tight-display">
                {displayTitle}
              </h2>
              {item.source && (
                <a
                  href={item.source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 inline-flex items-center gap-2 text-sm text-purple-300 hover:text-banana-400 transition-colors font-body"
                >
                  <span>{t.by} {item.source.name}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>

            {/* Tags */}
            {item.tags && item.tags.length > 0 && (
              <div className="px-4 sm:px-6 py-3 border-b border-white/10 bg-white/5">
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="tag-pill text-[10px] sm:text-xs bg-white/5 text-purple-300 border-white/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Content */}
            <div className="p-4 sm:p-6 space-y-5 max-h-[60vh] overflow-y-auto scrollbar-hide overscroll-y-contain">
              {/* Images */}
              {item.images && item.images.length > 0 && (
                <div className={`grid gap-3 pointer-events-none ${item.images.length === 1 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
                  {item.images.map((img, idx) => (
                    <ModalImage
                      key={idx}
                      src={img.startsWith('http') ? img : `/${img}`}
                      alt={`${item.title} - 图片 ${idx + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Prompts */}
              {item.prompts && item.prompts.length > 0 && (
                <section>
                  <h3 className="font-display font-semibold text-lg text-banana-400 mb-3 flex items-center gap-2 tracking-tight">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {t.prompts}
                  </h3>
                  <div className="space-y-3">
                    {item.prompts.map((prompt, idx) => (
                      <div key={idx} className="group relative">
                        <pre className="font-mono text-xs sm:text-sm bg-purple-950/70 border border-white/10 rounded-xl p-12 pr-24 text-purple-100 whitespace-pre-wrap break-words leading-relaxed">
                          {prompt}
                        </pre>
                        <motion.button
                          onClick={() => handleCopy(prompt, idx)}
                          className="absolute top-3 right-3 px-3 py-2 rounded-lg bg-black/80 backdrop-blur-sm text-banana-400 border border-banana-400/40 text-xs font-medium hover:bg-black/90 transition-all flex items-center gap-1.5 shadow-lg z-10"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {copiedIndex === idx ? (
                            <>
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {t.copied}
                            </>
                          ) : (
                            <>
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                              {t.copy}
                            </>
                          )}
                        </motion.button>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Examples */}
              {item.examples && item.examples.length > 0 && (
                <section>
                  <h3 className="font-display font-semibold text-lg text-banana-400 mb-3 tracking-tight">{t.examples}</h3>
                  <div className="space-y-2">
                    {item.examples.map((example, idx) => (
                      <div
                        key={idx}
                        className="font-mono text-xs sm:text-sm bg-purple-950/40 border border-white/10 rounded-lg p-3 text-purple-200 leading-relaxed"
                      >
                        {example}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Notes */}
              {item.notes && item.notes.length > 0 && (
                <section>
                  <h3 className="font-display font-semibold text-lg text-banana-400 mb-3 tracking-tight">{t.notes}</h3>
                  <div className="space-y-2">
                    {item.notes.map((note, idx) => (
                      <div
                        key={idx}
                        className="text-sm bg-neon-pink/20 border border-neon-pink/30 rounded-lg p-3 text-purple-100 font-body leading-relaxed"
                      >
                        {note}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Description */}
              {item.description && (
                <section>
                  <h3 className="font-display font-semibold text-lg text-banana-400 mb-3 tracking-tight">{t.description}</h3>
                  <p className="text-purple-100 leading-relaxed text-sm font-body">{item.description}</p>
                </section>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
