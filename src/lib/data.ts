import { PromptData } from '@/types'
import localData from '@/data/prompts.json'

export async function getPromptData(): Promise<PromptData> {
  // Always use local data
  return localData as PromptData
}

export function buildAllTags(items: PromptData['items']): string[] {
  const tagSet = new Set<string>()
  items.forEach((item) => {
    (item.tags || []).forEach((tag) => tagSet.add(tag))
  })
  return Array.from(tagSet).sort((a, b) => a.localeCompare(b, 'zh-CN'))
}

export function filterItems(
  items: PromptData['items'],
  searchTerm: string,
  selectedTags: Set<string>
): PromptData['items'] {
  return items.filter((item) => {
    const matchesSearch =
      searchTerm === '' ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toString().includes(searchTerm) ||
      item.prompts.some((p) => p.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesTags =
      selectedTags.size === 0 ||
      item.tags?.some((tag) => selectedTags.has(tag))

    return matchesSearch && matchesTags
  })
}
