# 数据加载说明

## 当前实现

项目**完全使用本地数据文件**，不再从远程服务器获取数据。

## 数据源

### 主要数据文件
- **src/data/prompts.json** - 提示词案例数据
- **src/data/title-en.json** - 英文翻译数据

### 代码实现

**文件：`src/lib/data.ts`**

```typescript
import { PromptData } from '@/types'
import localData from '@/data/prompts.json'

export async function getPromptData(): Promise<PromptData> {
  // 始终使用本地数据
  return localData as PromptData
}
```

## 优点

1. **无 CORS 问题** - 完全本地化，无跨域请求
2. **加载速度快** - 无网络延迟，即时加载
3. **离线可用** - 无需网络连接
4. **数据可控** - 完全控制数据内容和更新时机
5. **部署简单** - 无需配置远程服务器或代理

## 更新数据

### 方法 1：手动编辑
直接编辑 `src/data/prompts.json` 文件

### 方法 2：运行脚本
如果有数据更新脚本，运行脚本更新 JSON 文件

### 方法 3：重新构建
```bash
# 更新数据后重新构建
npm run build
npm run start
```

## 数据结构

### prompts.json 结构
```json
{
  "generatedAt": "2026-01-05T15:10:53.141Z",
  "total": 1084,
  "items": [
    {
      "id": 1084,
      "slug": "prompt-1084",
      "title": "案例标题",
      "title_en": "Case Title",
      "source": {
        "name": "作者名",
        "url": "来源链接"
      },
      "model": "模型名称",
      "images": ["images/1084.jpeg"],
      "prompts": ["提示词内容"],
      "examples": [],
      "notes": [],
      "originFile": "README.md",
      "description": "",
      "tags": ["tag1", "tag2"],
      "coverImage": "images/1084.jpeg"
    }
  ]
}
```

## 历史变更

### 2024-01-06
- ❌ 移除远程数据获取功能
- ✅ 简化为仅使用本地 prompts.json
- ✅ 消除所有 CORS 相关问题
- ✅ 提升加载速度和可靠性

## 相关文件

- `src/lib/data.ts` - 数据获取逻辑
- `src/data/prompts.json` - 主要数据文件
- `src/data/title-en.json` - 英文翻译数据
- `src/types/index.ts` - TypeScript 类型定义
