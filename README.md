# 🍌 Banana Nano Prompt Gallery

> 一个现代化、视觉惊艳的 AI 提示词案例库，展示 1084+ 个精心策划的 AI 生成艺术作品。

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Cloudflare R2](https://img.shields.io/badge/Cloudflare-R2-orange?style=for-the-badge&logo=cloudflare)](https://www.cloudflare.com/products/r2/)

## ✨ 特性

### 🎨 设计与体验
- **独特设计**: Playful Pop-Art x Futurism 风格，香蕉黄 + 霓虹紫配色
- **自定义字体系统**: Syne (展示) + Outfit (正文) + Space Mono (代码)
- **流畅动画**: Framer Motion 驱动的丝滑交互和页面过渡
- **响应式布局**: 完美支持移动端、平板和桌面设备

### 🔍 功能强大
- **实时搜索**: 快速搜索标题和提示词内容
- **标签筛选**: 按风格、模型等标签筛选案例
- **双语支持**: 中文/English 自动切换，智能语言检测
- **详情模态框**: 点击卡片查看大图和完整提示词
- **一键复制**: 快速复制提示词到剪贴板

### ⚡ 性能优化
- **CDN 加速**: 1303+ 张图片通过 Cloudflare R2 CDN 全球分发
- **图像优化**: Next.js Image 组件自动优化
- **代码分割**: 按需加载，首屏渲染快速
- **数据缓存**: 智能缓存策略

### 🚀 开发体验
- **TypeScript**: 类型安全，开发体验优秀
- **组件化**: 清晰的组件结构和代码组织
- **增量上传**: R2 图片增量上传工具，避免重复上传

## 🎯 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| **Next.js** | 15.5.9 | React 框架，App Router |
| **React** | 19.0 | UI 库 |
| **TypeScript** | 5 | 类型安全 |
| **Tailwind CSS** | 3.4 | 样式框架 |
| **Framer Motion** | 11.15 | 动画库 |
| **AWS SDK** | 3.962 | R2 存储客户端 |
| **Cloudflare R2** | - | 图片 CDN 存储 |

### 字体系统
- **Syne** (700, 800) - 标题和展示文本
- **Outfit** (300-700) - 正文和 UI 文本
- **Space Mono** (400, 700) - 代码和提示词

## 📦 安装与运行

### 环境要求

- Node.js 18+
- npm 或 yarn

### 快速开始

```bash
# 1. 克隆仓库
git clone https://github.com/gotoBest/banana-nano-prompt.git
cd banana-nano-prompt

# 2. 安装依赖
npm install

# 3. 运行开发服务器
npm run dev

# 4. 打开浏览器访问
# http://localhost:3000
```

### 构建生产版本

```bash
# 构建
npm run build

# 启动生产服务器
npm run start
```

## 🚀 部署

### Vercel 部署（推荐）

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/gotoBest/banana-nano-prompt)

1. 点击上方按钮
2. 导入 GitHub 仓库
3. Vercel 自动检测 Next.js 配置
4. 点击 "Deploy"

### 环境变量（可选）

如果需要配置 CDN 或其他功能：

```env
# R2 CDN 域名（图片已配置为 https://gotovpn.win）
NEXT_PUBLIC_R2_CDN_URL=https://your-cdn-domain.com
```

## 🎨 设计系统

### 颜色方案
```css
--color-banana: #FFE135;      /* 香蕉黄 */
--color-neon-pink: #FF6B9D;   /* 霓虹粉 */
--color-neon-purple: #B829DD; /* 霓虹紫 */
--color-bg-dark: #0F0E1E;     /* 深色背景 */
--color-bg-card: #1A1033;     /* 卡片背景 */
```

### 字体层级
```css
--font-display: 'Syne', sans-serif;
--font-body: 'Outfit', sans-serif;
--font-mono: 'Space Mono', monospace;
```

### 组件特点
- **Glass Card**: 毛玻璃效果卡片
- **Neon Glow**: 霓虹发光边框
- **Skeleton Shimmer**: 骨架屏加载动画
- **Hover Effects**: 3D 倾斜和缩放效果

## 📁 项目结构

```
banana-nano-prompt/
├── src/
│   ├── app/
│   │   ├── globals.css          # 全局样式和 CSS 变量
│   │   ├── layout.tsx           # 根布局（字体加载）
│   │   └── page.tsx             # 主页面
│   ├── components/
│   │   ├── Header.tsx           # 顶部导航栏
│   │   ├── PromptCard.tsx       # 案例卡片组件
│   │   ├── Modal.tsx            # 详情弹窗
│   │   └── MetadataUpdater.tsx  # SEO 元数据更新
│   ├── contexts/
│   │   └── LanguageContext.tsx  # 语言切换上下文
│   ├── data/
│   │   ├── prompts.json         # 1084 个案例数据
│   │   ├── title-en.json        # 英文翻译
│   │   └── id-title.json        # ID-标题映射
│   ├── lib/
│   │   ├── data.ts              # 数据加载
│   │   └── i18n.ts              # 国际化翻译
│   └── types/
│       └── index.ts             # TypeScript 类型定义
├── public/
│   └── images/                  # 图片文件夹（已迁移到 R2）
├── scripts/
│   ├── upload-images-to-r2.js  # R2 上传脚本
│   ├── update-image-urls-to-r2.js # URL 更新脚本
│   └── download-images.js      # 图片下载脚本
├── .env.local.example           # 环境变量模板
├── next.config.js               # Next.js 配置
├── tailwind.config.ts           # Tailwind 配置
└── package.json
```

## 📊 数据统计

- **案例总数**: 1084 个 AI 提示词案例
- **图片数量**: 1303+ 张高质量图片
- **存储方式**: Cloudflare R2 CDN
- **数据大小**: ~2MB (不含图片)
- **支持语言**: 中文、English

## 🔧 R2 CDN 管理

### 上传图片到 R2

```bash
# 首次上传或增量上传
npm run r2:upload

# 更新图片 URL
NEXT_PUBLIC_R2_CDN_URL=https://your-cdn.com npm run r2:update-urls
```

### 特点
- ✅ **增量上传**: 自动跳过已上传的文件
- ✅ **记录跟踪**: r2-upload-record.json 记录上传历史
- ✅ **R2 同步**: 自动从 R2 同步已存在文件
- ✅ **进度显示**: 实时显示上传/跳过进度

## 🌍 国际化

### 支持的语言
- 🇨🇳 中文 (简体)
- 🇺🇸 English

### 自动检测
- 根据浏览器语言自动切换
- 中文用户自动显示中文
- 其他语言默认显示英文
- 手动切换即时生效

## 🎯 使用场景

- ✅ AI 艺术创作者寻找灵感
- ✅ 提示词工程师参考学习
- ✅ 设计师探索 AI 绘图风格
- ✅ 开发者学习 Next.js 最佳实践

## 🛠️ 开发命令

```bash
# 开发
npm run dev          # 启动开发服务器

# 构建
npm run build        # 构建生产版本
npm run start        # 启动生产服务器

# 图片管理
npm run download-images      # 下载图片
npm run r2:upload            # 上传到 R2
npm run r2:update-urls       # 更新图片 URL

# 代码检查
npm run lint          # ESLint 检查
```

## 🤝 贡献指南

欢迎贡献代码、报告问题或提出新功能建议！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📝 更新日志

### v1.0.0 (2026-01-06)
- ✅ 初始发布
- ✅ 1084 个 AI 提示词案例
- ✅ 双语支持（中文/English）
- ✅ 响应式设计
- ✅ R2 CDN 集成
- ✅ 增量上传功能

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React 框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [Framer Motion](https://www.framer.com/motion/) - 动画库
- [Cloudflare R2](https://www.cloudflare.com/products/r2/) - 对象存储
- [Nano Banana](https://nano.banana/) - AI 提示词来源

---

**Made with 🍌 by [gotoBest](https://github.com/gotoBest)**

⭐ 如果这个项目对你有帮助，请给个 Star！

📧 有问题或建议？欢迎提交 [Issue](https://github.com/gotoBest/banana-nano-prompt/issues)
