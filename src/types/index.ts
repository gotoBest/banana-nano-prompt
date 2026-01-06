export interface Source {
  name: string;
  url: string;
}

export interface PromptItem {
  id: number;
  slug: string;
  title: string;
  title_en?: string; // 英文标题（可选）
  source: Source;
  model: string;
  images: string[];
  prompts: string[];
  examples: string[];
  notes: string[];
  originFile: string;
  description: string;
  tags: string[];
  coverImage: string;
}

export interface PromptData {
  generatedAt: string;
  total: number;
  items: PromptItem[];
}
