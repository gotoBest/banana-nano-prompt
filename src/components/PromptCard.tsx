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

export default function PromptCard({ item, onClick, index }: PromptCardProps) {
  const { t, language } = useLanguage()
  const [imageLoaded, setImageLoaded] = useState(false)
  // Check if coverImage is already a full URL (for R2 CDN)
  const imageUrl = item.coverImage
    ? (item.coverImage.startsWith('http') ? item.coverImage : `/${item.coverImage}`)
    : null

  // 根据语言选择标题
  const displayTitle = language === 'en' && item.title_en ? item.title_en : item.title

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.03, 0.5) }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="glass-card card-hover overflow-hidden h-full">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-purple-900/40 to-slate-900/40">
          {imageUrl ? (
            <>
              {/* Skeleton placeholder */}
              {!imageLoaded && (
                <div className="absolute inset-0 skeleton-shimmer">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl text-purple-400/40">🎨</div>
                  </div>
                </div>
              )}

              <Image
                src={imageUrl}
                alt={`案例 ${item.id}: ${displayTitle}`}
                fill
                className={`object-cover transition-opacity duration-300 transition-transform duration-500 group-hover:scale-110 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
              />
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-purple-400/50 text-5xl">
              🎨
            </div>
          )}

          {/* ID Badge */}
          <div className="absolute top-2 left-2 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 z-10">
            <span className="font-display font-bold text-xs text-banana-400 tracking-tight">
              #{item.id}
            </span>
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-3 lg:p-4">
          <h3 className="font-display font-semibold text-base lg:text-lg text-white mb-2 line-clamp-2 group-hover:text-banana-400 transition-colors leading-snug tracking-tight-display">
            {displayTitle}
          </h3>

          {/* Model Badge */}
          <div className="mb-2">
            <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-neon-purple/20 text-neon-purple border border-neon-purple/30 font-medium tracking-wide">
              {item.model || t.nanoBananaPro}
            </span>
          </div>

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {item.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/5 text-purple-300 border border-white/10"
                >
                  {tag}
                </span>
              ))}
              {item.tags.length > 3 && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/5 text-purple-300">
                  +{item.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  )
}
