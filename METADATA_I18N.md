# 多语言 Metadata 系统

## 功能说明

网站实现了完整的多语言 metadata 系统，根据用户选择的语言自动更新页面元数据，包括：
- 页面标题（title）
- Meta 描述（description）
- Meta 关键词（keywords）
- Open Graph 标签
- Twitter Card 标签
- HTML lang 属性

## 实现方式

### 1. 静态 Metadata（服务器端）

**文件：`src/app/layout.tsx`**

```typescript
export async function generateMetadata(): Promise<Metadata> {
  const zhMeta = translations.zh.metadata
  const enMeta = translations.en.metadata

  return {
    title: zhMeta.title,
    description: zhMeta.description,
    keywords: zhMeta.keywords,
    icons: {
      icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🍌</text></svg>',
    },
    alternates: {
      languages: {
        'zh-CN': '/',
        'en': '/',
      },
    },
    openGraph: {
      title: zhMeta.title,
      description: zhMeta.description,
      type: 'website',
      locale: 'zh_CN',
      alternateLocale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: zhMeta.title,
      description: zhMeta.description,
    },
  }
}
```

**作用：**
- 提供默认的中文 metadata
- 用于 SSR（服务器端渲染）
- 用于 SEO 和社交媒体分享

### 2. 动态 Metadata 更新（客户端）

**文件：`src/components/MetadataUpdater.tsx`**

```typescript
'use client'

import { useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/lib/i18n'

export default function MetadataUpdater() {
  const { language } = useLanguage()

  useEffect(() => {
    const meta = translations[language].metadata

    // 更新页面标题
    document.title = meta.title

    // 更新 meta description
    // 更新 meta keywords
    // 更新 Open Graph 标签
    // 更新 Twitter Card 标签
    // 更新 html lang 属性
  }, [language])

  return null
}
```

**作用：**
- 根据用户语言切换动态更新 metadata
- 实时响应语言变化
- 提供最佳用户体验

### 3. 翻译数据

**文件：`src/lib/i18n.ts`**

```typescript
export const translations = {
  zh: {
    metadata: {
      title: '🍌 Nano Banana - Prompt 精选案例',
      description: 'Nano Banana 提供海量 Prompt 精选案例...',
      keywords: ['Nano Banana', 'Prompt', ...],
    },
    // ... 其他翻译
  },
  en: {
    metadata: {
      title: '🍌 Nano Banana - Prompt Collection',
      description: 'Nano Banana provides a vast collection...',
      keywords: ['Nano Banana', 'Prompt', ...],
    },
    // ... 其他翻译
  },
}
```

## 工作流程

### 首次加载

```
1. 用户访问网站
   ↓
2. Next.js 执行 generateMetadata()
   - 使用默认中文 metadata
   - 用于 SSR 和初始 HTML
   ↓
3. 页面渲染完成
   ↓
4. MetadataUpdater 组件执行
   - 检测系统语言
   - 更新为对应的语言 metadata
```

### 语言切换

```
1. 用户点击语言切换按钮
   ↓
2. LanguageContext 更新 language 状态
   ↓
3. MetadataUpdater 监听到 language 变化
   ↓
4. 自动更新所有 metadata
   - document.title
   - meta description
   - meta keywords
   - og:title, og:description, og:locale
   - twitter:title, twitter:description
   - html lang 属性
   ↓
5. 页面立即反映新语言
```

## Metadata 更新列表

### 基础 HTML Meta

| 元素 | 中文 | 英文 |
|------|------|------|
| `<title>` | 🍌 Nano Banana - Prompt 精选案例 | 🍌 Nano Banana - Prompt Collection |
| `<meta name="description">` | Nano Banana 提供海量 Prompt... | Nano Banana provides a vast collection... |
| `<meta name="keywords">` | Nano Banana, Prompt... | Nano Banana, Prompt... |
| `<html lang>` | zh-CN | en |

### Open Graph 标签

| 属性 | 中文 | 英文 |
|------|------|------|
| `og:title` | 🍌 Nano Banana - Prompt 精选案例 | 🍌 Nano Banana - Prompt Collection |
| `og:description` | Nano Banana 提供海量... | Nano Banana provides a vast... |
| `og:locale` | zh_CN | en_US |

### Twitter Card 标签

| 属性 | 中文 | 英文 |
|------|------|------|
| `twitter:title` | 🍌 Nano Banana - Prompt 精选案例 | 🍌 Nano Banana - Prompt Collection |
| `twitter:description` | Nano Banana 提供海量... | Nano Banana provides a vast... |

## SEO 优势

### 1. 搜索引擎优化
- ✅ 不同语言用户看到对应的 metadata
- ✅ 提高搜索结果相关性
- ✅ 改善点击率（CTR）

### 2. 社交媒体分享
- ✅ Facebook/LinkedIn 使用 Open Graph 标签
- ✅ Twitter 使用 Twitter Card 标签
- ✅ 分享预览自动使用用户选择的语言

### 3. 浏览器兼容
- ✅ 现代浏览器完全支持
- ✅ 动态更新不影响用户体验
- ✅ 无需刷新页面

## 测试方法

### 1. 检查页面标题
```javascript
// 在浏览器控制台运行
console.log(document.title)
```

### 2. 检查 meta 标签
```javascript
// 检查 description
console.log(document.querySelector('meta[name="description"]')?.content)

// 检查 keywords
console.log(document.querySelector('meta[name="keywords"]')?.content)

// 检查 og:title
console.log(document.querySelector('meta[property="og:title"]')?.content)

// 检查 html lang
console.log(document.documentElement.lang)
```

### 3. 测试语言切换
1. 打开网站
2. 点击右上角语言切换按钮
3. 观察浏览器标签页标题变化
4. 打开开发者工具查看 `<head>` 标签更新

### 4. 模拟分享预览

**Facebook Debugger:**
```
https://developers.facebook.com/tools/debug/
```

**Twitter Card Validator:**
```
https://cards-dev.twitter.com/validator
```

**LinkedIn Post Inspector:**
```
https://www.linkedin.com/post-inspector/
```

## 相关文件

| 文件 | 作用 |
|------|------|
| `src/app/layout.tsx` | 静态 metadata 生成 |
| `src/components/MetadataUpdater.tsx` | 动态 metadata 更新 |
| `src/lib/i18n.ts` | 翻译数据（含 metadata） |
| `src/contexts/LanguageContext.tsx` | 语言状态管理 |

## 注意事项

1. **SEO 爬虫**
   - 大多数爬虫会执行 JavaScript
   - MetadataUpdater 确保动态更新被爬虫看到
   - 静态 metadata 作为 fallback

2. **社交媒体爬虫**
   - Facebook/Twitter 爬虫通常不执行 JavaScript
   - 静态 metadata 确保基础分享功能
   - 考虑使用服务器端语言检测优化

3. **性能影响**
   - MetadataUpdater 是轻量级组件
   - 只在语言切换时执行
   - 不影响页面渲染性能

## 未来优化

### 1. 服务器端语言检测
```typescript
// 根据请求头检测语言
export async function generateMetadata({ request }): Promise<Metadata> {
  const acceptLanguage = request.headers.get('accept-language')
  const lang = detectLanguage(acceptLanguage)

  return {
    title: translations[lang].metadata.title,
    // ...
  }
}
```

### 2. 结构化数据（Schema.org）
```typescript
// 添加 JSON-LD
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Nano Banana",
  "inLanguage": language === 'zh' ? 'zh-CN' : 'en'
}
</script>
```

### 3. hreflang 标签
```typescript
// 添加语言切换链接
<link rel="alternate" hreflang="zh-CN" href="https://example.com/zh" />
<link rel="alternate" hreflang="en" href="https://example.com/en" />
```

## 更新日志

**2024-01-06**
- ✅ 实现完整的多语言 metadata 系统
- ✅ 添加 MetadataUpdater 组件
- ✅ 支持动态语言切换
- ✅ 更新 Open Graph 和 Twitter Card 标签
- ✅ 自动更新 HTML lang 属性
