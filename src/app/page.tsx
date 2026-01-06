'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { PromptItem } from '@/types'
import { getPromptData, buildAllTags, filterItems } from '@/lib/data'
import Header from '@/components/Header'
import PromptCard from '@/components/PromptCard'
import Modal from '@/components/Modal'
import { useLanguage } from '@/contexts/LanguageContext'

const ITEMS_PER_PAGE = 24 // 每次加载24个

export default function Home() {
  const { t } = useLanguage()
  const [items, setItems] = useState<PromptItem[]>([])
  const [filteredItems, setFilteredItems] = useState<PromptItem[]>([])
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE)
  const [allTags, setAllTags] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set())
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedItem, setSelectedItem] = useState<PromptItem | null>(null)
  const [loading, setLoading] = useState(true)
  const observerTarget = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const data = await getPromptData()
        setItems(data.items)
        setFilteredItems(data.items)
        setAllTags(buildAllTags(data.items))
      } catch (error) {
        console.error('Failed to load data:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    const filtered = filterItems(items, searchTerm, selectedTags)
    setFilteredItems(filtered)
    // 重置显示数量
    setDisplayCount(ITEMS_PER_PAGE)
  }, [items, searchTerm, selectedTags])

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && displayCount < filteredItems.length) {
          setDisplayCount((prev) => Math.min(prev + ITEMS_PER_PAGE, filteredItems.length))
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    )

    const currentTarget = observerTarget.current
    if (currentTarget) {
      observer.observe(currentTarget)
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget)
      }
    }
  }, [displayCount, filteredItems.length])

  const handleTagToggle = useCallback((tag: string) => {
    setSelectedTags((prev) => {
      const next = new Set(prev)
      if (next.has(tag)) {
        next.delete(tag)
      } else {
        next.add(tag)
      }
      return next
    })
  }, [])

  const handleClearFilters = useCallback(() => {
    setSelectedTags(new Set())
    setSearchTerm('')
  }, [])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setSelectedItem(null)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-7xl mb-6"
          >
            🍌
          </motion.div>
          <motion.div
            className="font-display text-2xl gradient-text-animated"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {t.loading}
          </motion.div>
        </div>
      </div>
    )
  }

  const displayedItems = filteredItems.slice(0, displayCount)
  const hasMore = displayCount < filteredItems.length

  return (
    <main className="min-h-screen pb-8">
      <Header
        allTags={allTags}
        selectedTags={selectedTags}
        onTagToggle={handleTagToggle}
        onClearFilters={handleClearFilters}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        resultCount={filteredItems.length}
        totalCount={items.length}
      />

      <div className="max-w-[1800px] mx-auto px-3 sm:px-4 lg:px-6">
        {filteredItems.length === 0 ? (
          <div className="text-center py-32">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="text-8xl mb-6"
            >
              🔍
            </motion.div>
            <h3 className="font-display text-3xl text-white mb-3">{t.noResults}</h3>
            <p className="text-purple-400 text-lg">{t.noResultsHint}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 lg:gap-4">
              {displayedItems.map((item, index) => (
                <PromptCard
                  key={item.id}
                  item={item}
                  onClick={() => setSelectedItem(item)}
                  index={index}
                />
              ))}
            </div>

            {/* Loading indicator and observer target */}
            <div ref={observerTarget} className="flex flex-col items-center justify-center py-8">
              {hasMore && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="text-4xl mb-2"
                >
                  🍌
                </motion.div>
              )}
              {!hasMore && displayedItems.length > 0 && (
                <p className="text-purple-400 text-sm">
                  {t.allDisplayed} {displayedItems.length} {t.cases}
                </p>
              )}
            </div>
          </>
        )}
      </div>

      <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </main>
  )
}
