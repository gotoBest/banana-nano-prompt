# 🍌 Nano Banana - AI 提示词案例库

一个现代化、视觉惊艳的 AI 提示词案例库，使用 Next.js 15、Tailwind CSS 和 TypeScript 构建。

![Nano Banana](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=for-the-badge&logo=tailwind-css)

## ✨ 特性

- 🎨 **独特的设计**：Playful Pop-Art x Futurism 风格，视觉惊艳
- 🔍 **强大搜索**：实时搜索和标签筛选
- 📱 **完全响应式**：完美支持移动端、平板和桌面
- ⚡ **性能优化**：Next.js 15 + 图像优化 + 数据缓存
- 🎭 **流畅动画**：Framer Motion 驱动的丝滑交互
- 🚀 **一键部署**：支持 Vercel 零配置部署

## 🎯 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **字体**: Playfair Display + JetBrains Mono
- **部署**: Vercel

## 📦 本地开发

### 环境要求

- Node.js 18+
- npm 或 yarn

### 安装依赖

```bash
npm install
# 或
yarn install
```

### 运行开发服务器

```bash
npm run dev
# 或
yarn dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看效果。

### 构建生产版本

```bash
npm run build
npm run start
```

## 🚀 部署到 Vercel

### 方法一：通过 Vercel Dashboard（推荐）

1. 将代码推送到 GitHub
2. 访问 [vercel.com](https://vercel.com)
3. 点击 "New Project"
4. 导入你的 GitHub 仓库
5. Vercel 会自动检测 Next.js 配置，直接点击 "Deploy"

### 方法二：通过 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel
```

### 环境变量（可选）

如果你想使用自己的数据源，可以在 Vercel 中设置环境变量：

```
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

## 🎨 设计特色

### 颜色方案
- **主色**: 香蕉黄 (#FFE135)
- **辅色**: 深紫 (#1A0B2E)、霓虹粉 (#FF6B9D)
- **渐变**: 紫色到深蓝的深色背景

### 字体
- **标题**: Playfair Display - 优雅的衬线字体
- **代码/提示词**: JetBrains Mono - 等宽字体

### 交互效果
- 卡片悬停时的 3D 倾斜效果
- 页面加载时的错落动画
- 标签筛选的实时反馈
- 平滑的模态框过渡

## 📁 项目结构

```
banana-nano-prompt/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Modal.tsx
│   │   └── PromptCard.tsx
│   ├── lib/
│   │   └── data.ts
│   └── types/
│       └── index.ts
├── public/
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── README.md
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可

MIT License

---

Made with 🍌 by [Your Name]
