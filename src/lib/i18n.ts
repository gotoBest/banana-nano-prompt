export type Language = 'zh' | 'en'

export const translations = {
  zh: {
    // Header
    search: '搜索案例...',
    allTags: '全部标签',
    clearFilters: '清除筛选',
    results: '个结果',
    // Page
    loading: '加载中...',
    noResults: '没有找到匹配的案例',
    noResultsHint: '请尝试调整搜索关键词或选择其他标签',
    allDisplayed: '已显示全部',
    cases: '个案例',
    // Modal
    close: '关闭',
    prompts: '提示词',
    copy: '复制',
    copied: '已复制',
    examples: '示例',
    notes: '备注',
    description: '描述',
    image: '图片',
    by: 'by',
    model: '模型',
    // Card
    case: '案例',
    nanoBananaPro: 'Nano banana pro',
    // Metadata
    metadata: {
      title: '🍌 Nano Banana - Prompt 精选案例',
      description: 'Nano Banana 提供海量 Prompt 精选案例，快速复制 Prompt，探索灵感，提升创作效率。',
      keywords: ['Nano Banana', 'nanobanana', 'gpt4o', 'ChatGPT', 'Prompt', 'Prompt 精选案例', 'Prompt 案例', 'Prompt 库'],
    },
  },
  en: {
    // Header
    search: 'Search cases...',
    allTags: 'All Tags',
    clearFilters: 'Clear Filters',
    results: 'results',
    // Page
    loading: 'Loading...',
    noResults: 'No matching cases found',
    noResultsHint: 'Try adjusting search keywords or selecting other tags',
    allDisplayed: 'Displaying all',
    cases: 'cases',
    // Modal
    close: 'Close',
    prompts: 'Prompts',
    copy: 'Copy',
    copied: 'Copied',
    examples: 'Examples',
    notes: 'Notes',
    description: 'Description',
    image: 'Image',
    by: 'by',
    model: 'Model',
    // Card
    case: 'Case',
    nanoBananaPro: 'Nano banana pro',
    // Metadata
    metadata: {
      title: '🍌 Nano Banana - Prompt Collection',
      description: 'Nano Banana provides a vast collection of curated Prompt cases. Quickly copy Prompts, explore inspiration, and boost your creative efficiency.',
      keywords: ['Nano Banana', 'nanobanana', 'gpt4o', 'ChatGPT', 'Prompt', 'Prompt Collection', 'Prompt Cases', 'Prompt Library'],
    },
  },
}

export function t(lang: Language): typeof translations.zh {
  return translations[lang]
}
