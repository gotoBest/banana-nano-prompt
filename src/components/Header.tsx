'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage, Language } from '@/contexts/LanguageContext'

interface HeaderProps {
  allTags: string[]
  selectedTags: Set<string>
  onTagToggle: (tag: string) => void
  onClearFilters: () => void
  searchTerm: string
  onSearchChange: (term: string) => void
  resultCount: number
  totalCount: number
}

export default function Header({
  allTags,
  selectedTags,
  onTagToggle,
  onClearFilters,
  searchTerm,
  onSearchChange,
  resultCount,
  totalCount,
}: HeaderProps) {
  const { language, setLanguage, t } = useLanguage()
  const [showAllTags, setShowAllTags] = useState(false)

  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh')
  }

  return (
    <header className="sticky top-0 z-40 backdrop-blur-2xl bg-black/40 border-b border-white/5">
      <div className="max-w-[1800px] mx-auto px-3 sm:px-4 lg:px-6 py-3">
        {/* Compact Header - Title, Search, and Stats in one row */}
        <div className="flex items-center gap-3 lg:gap-4 mb-3">
          {/* Logo/Title */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-shrink-0"
          >
            <span className="font-display text-xl lg:text-2xl font-bold gradient-text-animated">
              🍌 NANO
            </span>
          </motion.h1>

          {/* Search Bar - Takes available space */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-1 max-w-2xl"
          >
            <div className="search-compact flex items-center gap-2">
              <svg
                className="w-4 h-4 text-purple-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="search"
                placeholder={t.search}
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="flex-1 bg-transparent text-sm text-white placeholder-purple-400/60 focus:outline-none min-w-0"
              />
              {searchTerm && (
                <button
                  onClick={() => onSearchChange('')}
                  className="flex-shrink-0 text-purple-400 hover:text-white transition-colors p-0.5"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </motion.div>

          {/* Stats & Clear */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 flex-shrink-0"
          >
            <span className="text-xs text-purple-400 hidden sm:inline">
              <span className="font-bold text-banana-400">{resultCount}</span>/{totalCount}
            </span>
            {(selectedTags.size > 0 || searchTerm) && (
              <button
                onClick={onClearFilters}
                className="px-2.5 py-1 rounded-lg bg-neon-pink/20 border border-neon-pink/40 text-neon-pink hover:bg-neon-pink/30 transition-all text-xs font-medium whitespace-nowrap"
              >
                {t.clearFilters}
              </button>
            )}
          </motion.div>

          {/* Language Toggle - 单独放在最右边 */}
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            onClick={toggleLanguage}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0 relative group px-3 py-1.5 rounded-xl bg-gradient-to-r from-banana-400/30 to-neon-pink/30 border-2 border-banana-400/50 text-white hover:border-banana-400/80 transition-all text-sm font-bold whitespace-nowrap shadow-lg shadow-banana-400/20 hover:shadow-banana-400/40 ml-auto"
          >
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <span className="bg-gradient-to-r from-banana-400 to-neon-pink bg-clip-text text-transparent">
                {language === 'zh' ? 'EN' : '中文'}
              </span>
            </div>
            {/* Glow effect on hover */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-banana-400/20 to-neon-pink/20 opacity-0 group-hover:opacity-100 transition-opacity blur-md -z-10" />
          </motion.button>
        </div>

        {/* Horizontal Scroll Tags */}
        <AnimatePresence>
          {allTags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2"
            >
              <div className="horizontal-scroll pb-1 flex-1">
                {allTags.map((tag) => {
                  const isSelected = selectedTags.has(tag)
                  return (
                    <button
                      key={tag}
                      onClick={() => onTagToggle(tag)}
                      className={`tag-pill text-[11px] lg:text-xs ${
                        isSelected
                          ? 'bg-banana-400 text-black border-banana-400 font-semibold'
                          : 'bg-white/5 text-purple-300 border-white/10 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      {tag}
                    </button>
                  )
                })}
              </div>
              {allTags.length > 15 && (
                <button
                  onClick={() => setShowAllTags(!showAllTags)}
                  className="flex-shrink-0 text-xs text-banana-400 hover:text-banana-300 transition-colors px-2 py-1"
                >
                  {showAllTags ? '↑' : '↓'}
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
