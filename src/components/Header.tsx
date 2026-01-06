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

          {/* Language Toggle & GitHub Link */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2 flex-shrink-0 ml-auto"
          >
            {/* GitHub Link */}
            <motion.a
              href="https://github.com/gotoBest/banana-nano-prompt"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group px-3 py-1.5 rounded-xl bg-gradient-to-r from-white/10 to-white/5 border-2 border-white/20 text-white hover:border-white/40 transition-all shadow-lg hover:shadow-white/20"
            >
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </div>
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity blur-md -z-10" />
            </motion.a>

            {/* Language Toggle */}
            <motion.button
              onClick={toggleLanguage}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group px-3 py-1.5 rounded-xl bg-gradient-to-r from-banana-400/30 to-neon-pink/30 border-2 border-banana-400/50 text-white hover:border-banana-400/80 transition-all text-sm font-bold whitespace-nowrap shadow-lg shadow-banana-400/20 hover:shadow-banana-400/40"
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
          </motion.div>
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
