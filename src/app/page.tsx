'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PromptItem } from '@/types'
import { getPromptData, buildAllTags, filterItems } from '@/lib/data'
import HeaderNew from '@/components/HeaderNew'
import PromptCardNew from '@/components/PromptCardNew'
import ListCard from '@/components/ListCard'
import ModalNew from '@/components/ModalNew'
import { useLanguage } from '@/contexts/LanguageContext'

type ViewMode = 'gallery' | 'list' | 'filter'

const ITEMS_PER_PAGE = 24

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
  const [viewMode, setViewMode] = useState<ViewMode>('gallery')
  const observerTarget = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // 计算 hasMore - 需要在 useEffect 之前定义
  const hasMore = displayCount < filteredItems.length

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
    const target = observerTarget.current

    if (!target) {
      return
    }

    // 清理旧的 observer
    if (observerRef.current) {
      observerRef.current.disconnect()
      observerRef.current = null
    }

    // 创建新的 observer
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setDisplayCount((prev) => {
            const maxCount = filteredItems.length
            if (prev < maxCount) {
              return Math.min(prev + ITEMS_PER_PAGE, maxCount)
            }
            return prev
          })
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    )

    observer.observe(target)
    observerRef.current = observer

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [filteredItems.length, hasMore, viewMode])

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
      <div className="min-h-screen flex items-center justify-center bg-black">
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
            className="text-8xl mb-8"
          >
            🍌
          </motion.div>
          <motion.div
            className="font-display text-xl text-white/60"
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

  return (
    <main className="min-h-screen bg-black">
      <HeaderNew
        allTags={allTags}
        selectedTags={selectedTags}
        onTagToggle={handleTagToggle}
        onClearFilters={handleClearFilters}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        resultCount={filteredItems.length}
        totalCount={items.length}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        items={items}
      />

      <div className="max-w-[2000px] mx-auto px-4 lg:px-6 py-6">
        {filteredItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-32"
          >
            <div className="text-6xl mb-6">🔍</div>
            <h3 className="font-display text-2xl text-white mb-2">{t.noResults}</h3>
            <p className="text-white/40 text-lg">{t.noResultsHint}</p>
          </motion.div>
        ) : (
          <motion.div
            key={viewMode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
              {viewMode === 'gallery' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
                  {displayedItems.map((item, index) => (
                    <PromptCardNew
                      key={item.id}
                      item={item}
                      onClick={() => setSelectedItem(item)}
                      index={index}
                    />
                  ))}
                </div>
              )}

              {viewMode === 'list' && (
                <div className="flex flex-col gap-3 max-w-5xl mx-auto">
                  {displayedItems.map((item, index) => (
                    <ListCard
                      key={item.id}
                      item={item}
                      onClick={() => setSelectedItem(item)}
                      index={index}
                    />
                  ))}
                </div>
              )}

              {viewMode === 'filter' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
                  {displayedItems.map((item, index) => (
                    <PromptCardNew
                      key={item.id}
                      item={item}
                      onClick={() => setSelectedItem(item)}
                      index={index}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}

        {/* Loading indicator and observer target */}
        {filteredItems.length > 0 && (
          <div ref={observerTarget} className="flex flex-col items-center justify-center py-12">
            {hasMore && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="text-4xl mb-2 text-white/40"
              >
                🍌
              </motion.div>
            )}
            {!hasMore && displayedItems.length > 0 && (
              <p className="text-white/30 text-sm font-medium">
                Showing all {displayedItems.length} items
              </p>
            )}
          </div>
        )}
      </div>

      <ModalNew item={selectedItem} onClose={() => setSelectedItem(null)} />
    </main>
  )
}
