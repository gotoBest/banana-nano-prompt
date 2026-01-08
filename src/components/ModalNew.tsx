'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { PromptItem } from '@/types'
import { useLanguage } from '@/contexts/LanguageContext'

interface ModalProps {
  item: PromptItem | null
  onClose: () => void
}

// Gallery Image Component
function GalleryImage({
  src,
  alt,
  index,
  total,
  onPrev,
  onNext
}: {
  src: string;
  alt: string;
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div className="relative w-full aspect-[4/3] bg-black rounded-2xl overflow-visible group max-h-[60vh]">
      {/* Loading state */}
      {!imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/5 rounded-2xl z-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="text-5xl text-white/10"
          >
            ✨
          </motion.div>
        </div>
      )}

      {/* Image */}
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-contain transition-opacity duration-500 rounded-2xl ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
        priority={index === 0}
        onLoad={() => setImageLoaded(true)}
        style={{ maxHeight: '100%', objectFit: 'contain' }}
      />

      {/* Navigation overlay */}
      {total > 1 && (
        <>
          {/* Previous button */}
          <button
            onClick={onPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/80 transition-all z-20 opacity-0 group-hover:opacity-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next button */}
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/80 transition-all z-20 opacity-0 group-hover:opacity-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image counter */}
          <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-sm font-medium z-20">
            {index + 1} / {total}
          </div>
        </>
      )}
    </div>
  )
}

// Prompt Card Component
function PromptCard({
  prompt,
  index,
  copiedIndex,
  onCopy
}: {
  prompt: string;
  index: number;
  copiedIndex: number | null;
  onCopy: (prompt: string, index: number) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden hover:border-white/[0.15] transition-all duration-300"
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-4 mb-3">
          <span className="text-xs text-white/40 font-mono">Prompt {index + 1}</span>
          <motion.button
            onClick={() => onCopy(prompt, index)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              copiedIndex === index
                ? 'bg-white text-black'
                : 'bg-white/5 text-white/70 hover:bg-white/10'
            }`}
          >
            {copiedIndex === index ? '✓ Copied' : 'Copy'}
          </motion.button>
        </div>

        <pre
          className={`font-mono text-sm text-white/80 leading-relaxed whitespace-pre-wrap break-words transition-all duration-300 ${
            isExpanded ? '' : 'line-clamp-4'
          }`}
        >
          {prompt}
        </pre>

        {prompt.length > 300 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-3 text-xs text-white/40 hover:text-white/60 transition-colors"
          >
            {isExpanded ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>
    </motion.div>
  )
}

export default function ModalNew({ item, onClose }: ModalProps) {
  const { t, language } = useLanguage()
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

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

  const handlePrevImage = () => {
    if (item.images && item.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + item.images.length) % item.images.length)
    }
  }

  const handleNextImage = () => {
    if (item.images && item.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % item.images.length)
    }
  }

  const images = item.images || []
  const currentImage = images[currentImageIndex]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={handleBackdropClick}
        className="fixed inset-0 z-50 flex items-start justify-center pt-8 px-4 sm:px-8 pb-4 bg-black/90 backdrop-blur-xl overflow-y-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.4, ease: [0.175, 0.885, 0.32, 1.275] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-6xl"
        >
          <div className="bg-black border border-white/10 rounded-3xl shadow-2xl">
            {/* Image Gallery - Hero Section */}
            {images.length > 0 && currentImage && (
              <div className="relative group">
                <GalleryImage
                  src={currentImage.startsWith('http') ? currentImage : `/${currentImage}`}
                  alt={displayTitle || `Image ${currentImageIndex + 1}`}
                  index={currentImageIndex}
                  total={images.length}
                  onPrev={handlePrevImage}
                  onNext={handleNextImage}
                />

                {/* Close button - on top right corner of image, outside overflow */}
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 z-[100] w-14 h-14 rounded-full bg-black/90 backdrop-blur-md border-2 border-white/40 flex items-center justify-center text-white hover:bg-black hover:scale-110 transition-all shadow-2xl"
                  aria-label="Close"
                >
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}

            {/* Close button for when there are no images */}
            {images.length === 0 && (
              <div className="relative p-8">
                <button
                  onClick={onClose}
                  className="absolute top-8 right-8 z-[100] w-14 h-14 rounded-full bg-black/90 backdrop-blur-md border-2 border-white/40 flex items-center justify-center text-white hover:bg-black hover:scale-110 transition-all shadow-2xl"
                  aria-label="Close"
                >
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}

            {/* Content Section */}
            <div className="p-6 sm:p-8">
              {/* Header - Title & Meta */}
              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                    <span className="font-mono text-sm font-semibold text-white">#{item.id}</span>
                  </span>
                  {item.model && (
                    <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white/60 font-mono">
                      {item.model}
                    </span>
                  )}
                  {item.source && (
                    <a
                      href={item.source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/60 transition-colors"
                    >
                      @{item.source.name}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>

                <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4 leading-tight">
                  {displayTitle}
                </h2>

                {/* Tags */}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1.5 rounded-lg bg-white/5 text-white/50 border border-white/10 hover:bg-white/10 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Description */}
              {item.description && (
                <div className="mb-8">
                  <p className="text-white/60 leading-relaxed text-base">
                    {item.description}
                  </p>
                </div>
              )}

              {/* Prompts Section */}
              {item.prompts && item.prompts.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-display font-semibold text-xl text-white mb-4 flex items-center gap-2">
                    <svg className="w-6 h-6 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Prompts
                  </h3>
                  <div className="space-y-4">
                    {item.prompts.map((prompt, idx) => (
                      <PromptCard
                        key={idx}
                        prompt={prompt}
                        index={idx}
                        copiedIndex={copiedIndex}
                        onCopy={handleCopy}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Examples Section */}
              {item.examples && item.examples.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-display font-semibold text-xl text-white mb-4">Examples</h3>
                  <div className="space-y-3">
                    {item.examples.map((example, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-white/60 text-sm leading-relaxed"
                      >
                        {example}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes Section */}
              {item.notes && item.notes.length > 0 && (
                <div>
                  <h3 className="font-display font-semibold text-xl text-white mb-4">Notes</h3>
                  <div className="space-y-3">
                    {item.notes.map((note, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-white/60 text-sm leading-relaxed"
                      >
                        {note}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
