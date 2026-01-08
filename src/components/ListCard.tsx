'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { PromptItem } from '@/types'
import { useLanguage } from '@/contexts/LanguageContext'

interface ListCardProps {
  item: PromptItem
  onClick: () => void
  index: number
}

export default function ListCard({ item, onClick, index }: ListCardProps) {
  const { language } = useLanguage()
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  // 优先使用 coverImage，如果没有则使用 images 数组的第一张
  const imageUrl = item.coverImage || (item.images && item.images[0]) || null

  const displayTitle = language === 'en' && item.title_en ? item.title_en : item.title

  return (
    <motion.article
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.015, 0.3) }}
      layout="position"
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden bg-white/[0.02] border border-white/[0.08] rounded-2xl transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-black/50">
        <div className="flex flex-col sm:flex-row">
          {/* Thumbnail */}
          <div className="relative w-full sm:w-48 aspect-[3/4] sm:aspect-square flex-shrink-0 overflow-hidden bg-gradient-to-br from-white/[0.02] to-white/[0.05]">
            {imageUrl && !imageError ? (
              <>
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="text-3xl text-white/10"
                    >
                      ⚡
                    </motion.div>
                  </div>
                )}

                <Image
                  src={imageUrl}
                  alt={displayTitle}
                  fill
                  className={`object-cover transition-all duration-500 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  } group-hover:scale-105`}
                  sizes="(max-width: 640px) 100vw, 192px"
                  loading="lazy"
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                />

                {/* ID Badge - Top Left */}
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/40 backdrop-blur-md">
                  <span className="font-mono text-[10px] font-semibold text-white/90">
                    #{item.id}
                  </span>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-white/10 text-5xl">
                🎨
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 p-5 flex flex-col">
            {/* Header Row */}
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1 min-w-0">
                {/* ID */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs text-white/40">
                    #{item.id}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display font-semibold text-lg text-white line-clamp-2 group-hover:text-white transition-colors leading-snug tracking-tight">
                  {displayTitle}
                </h3>
              </div>

              {/* Action Button */}
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Tags */}
            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {item.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-1 rounded-lg bg-white/5 text-white/50 border border-white/10 hover:bg-white/10 hover:text-white/70 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
                {item.tags.length > 4 && (
                  <span className="text-[10px] px-2 py-1 rounded-lg text-white/30">
                    +{item.tags.length - 4} more
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  )
}
