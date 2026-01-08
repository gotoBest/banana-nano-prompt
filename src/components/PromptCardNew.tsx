'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { PromptItem } from '@/types'
import { useLanguage } from '@/contexts/LanguageContext'

interface PromptCardProps {
  item: PromptItem
  onClick: () => void
  index: number
}

export default function PromptCardNew({ item, onClick, index }: PromptCardProps) {
  const { language } = useLanguage()
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  // 优先使用 coverImage，如果没有则使用 images 数组的第一张
  const imageUrl = item.coverImage || (item.images && item.images[0]) || null

  const displayTitle = language === 'en' && item.title_en ? item.title_en : item.title

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.02, 0.4) }}
      layout="position"
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden bg-white/[0.02] border border-white/[0.08] rounded-2xl transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-black/50 hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-white/[0.02] to-white/[0.05]">
          {imageUrl && !imageError ? (
            <>
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="text-4xl text-white/10"
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
                } group-hover:scale-105 group-hover:duration-700`}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-white/10 text-6xl">
              🎨
            </div>
          )}

          {/* ID Badge - Top Left */}
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/40 backdrop-blur-md">
            <span className="font-mono text-xs font-semibold text-white/90">
              #{item.id}
            </span>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="font-display font-semibold text-base text-white mb-3 line-clamp-2 group-hover:text-white transition-colors leading-snug tracking-tight">
            {displayTitle}
          </h3>

          {/* Tags Preview */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex items-center gap-1 flex-wrap">
              {item.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-white/50"
                >
                  {tag}
                </span>
              ))}
              {item.tags.length > 3 && (
                <span className="text-[10px] text-white/30">
                  +{item.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Action Hint on Hover */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="px-3 py-1.5 rounded-full bg-white text-black text-xs font-semibold shadow-xl">
            View →
          </div>
        </div>
      </div>
    </motion.article>
  )
}
