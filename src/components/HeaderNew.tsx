'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

type ViewMode = 'gallery' | 'list' | 'filter'

interface HeaderProps {
  allTags: string[]
  selectedTags: Set<string>
  onTagToggle: (tag: string) => void
  onClearFilters: () => void
  searchTerm: string
  onSearchChange: (term: string) => void
  resultCount: number
  totalCount: number
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
  items: any[] // For tag counting
}

export default function HeaderNew({
  allTags,
  selectedTags,
  onTagToggle,
  onClearFilters,
  searchTerm,
  onSearchChange,
  resultCount,
  totalCount,
  viewMode,
  onViewModeChange,
  items,
}: HeaderProps) {
  const { language, setLanguage, t } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh')
  }

  const viewModes: { key: ViewMode; icon: string; label: string }[] = [
    { key: 'gallery', icon: '⊞', label: 'Gallery' },
    { key: 'list', icon: '☰', label: 'List' },
    { key: 'filter', icon: '◉', label: 'Filter' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-[2000px] mx-auto px-4 lg:px-6 py-4">
        {/* Top Row: Logo, View Toggle, Actions */}
        <div className="flex items-center gap-4 mb-4">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-shrink-0"
          >
            <h1 className="font-display font-extrabold text-xl lg:text-2xl tracking-tight">
              <span className="text-white">🍌</span>
              <span className="ml-1 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                NANO
              </span>
            </h1>
          </motion.div>

          {/* View Mode Toggle */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-1 bg-white/5 rounded-xl p-1 border border-white/10"
          >
            {viewModes.map((mode) => (
              <button
                key={mode.key}
                onClick={() => onViewModeChange(mode.key)}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  viewMode === mode.key
                    ? 'text-black'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {viewMode === mode.key && (
                  <motion.div
                    layoutId="viewModeIndicator"
                    className="absolute inset-0 bg-white rounded-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative flex items-center gap-2">
                  <span className="text-base">{mode.icon}</span>
                  <span className="hidden sm:inline">{mode.label}</span>
                </span>
              </button>
            ))}
          </motion.div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="hidden md:flex items-center gap-2 text-sm text-white/50"
          >
            <span className="text-white font-medium">{resultCount}</span>
            <span>/</span>
            <span>{totalCount}</span>
            {(selectedTags.size > 0 || searchTerm) && (
              <button
                onClick={onClearFilters}
                className="ml-2 px-3 py-1 rounded-lg bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-all text-xs font-medium"
              >
                Clear
              </button>
            )}
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2"
          >
            {/* GitHub */}
            <motion.a
              href="https://github.com/gotoBest/banana-nano-prompt"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </motion.a>

            {/* Language Toggle */}
            <motion.button
              onClick={toggleLanguage}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all text-sm font-semibold"
            >
              {language === 'zh' ? 'EN' : '中文'}
            </motion.button>
          </motion.div>
        </div>

        {/* Bottom Row: Search and Tags */}
        <AnimatePresence mode="wait">
          {viewMode !== 'filter' && (
            <motion.div
              key="search-row"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-4"
            >
              {/* Search Bar */}
              <div className="flex-1 max-w-2xl">
                <div className="relative group">
                  <svg
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-white/60 transition-colors"
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
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-white/20 focus:bg-white/[0.07] transition-all"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => onSearchChange('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-white/10 text-white/60 hover:text-white hover:bg-white/15 transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {/* Quick Tags (horizontal scroll) */}
              <div className="flex-1 flex items-center gap-2 overflow-x-auto scrollbar-hide">
                {allTags.slice(0, 8).map((tag) => {
                  const isSelected = selectedTags.has(tag)
                  return (
                    <button
                      key={tag}
                      onClick={() => onTagToggle(tag)}
                      className={`whitespace-nowrap px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                        isSelected
                          ? 'bg-white text-black'
                          : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {tag}
                    </button>
                  )
                })}
                {allTags.length > 8 && (
                  <span className="text-xs text-white/40 px-2">
                    +{allTags.length - 8} more
                  </span>
                )}
              </div>
            </motion.div>
          )}

          {viewMode === 'filter' && (
            <motion.div
              key="filter-panel"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {/* Search Bar in Filter View */}
              <div className="max-w-2xl">
                <div className="relative group">
                  <svg
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-white/60 transition-colors"
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
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-white/20 focus:bg-white/[0.07] transition-all"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => onSearchChange('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-white/10 text-white/60 hover:text-white hover:bg-white/15 transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {/* All Tags with Counts */}
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => {
                  const isSelected = selectedTags.has(tag)
                  const count = items.filter((item) => item.tags?.includes(tag)).length
                  return (
                    <button
                      key={tag}
                      onClick={() => onTagToggle(tag)}
                      className={`group px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isSelected
                          ? 'bg-white text-black shadow-lg shadow-white/10'
                          : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 hover:shadow-lg'
                      }`}
                    >
                      <span>{tag}</span>
                      <span className={`ml-2 text-xs ${isSelected ? 'text-black/50' : 'text-white/40'}`}>
                        {count}
                      </span>
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
