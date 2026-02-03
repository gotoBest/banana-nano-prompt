# 🍌 Banana Nano Prompt Gallery

> A modern, visually stunning AI prompt gallery showcasing 1084+ carefully curated AI-generated artworks.

**[🇨🇳 中文版 README](./README.zh-CN.md)** | [![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Cloudflare R2](https://img.shields.io/badge/Cloudflare-R2-orange?style=for-the-badge&logo=cloudflare)](https://www.cloudflare.com/products/r2/)

## ✨ Features

### 🎨 Design & Experience
- **Unique Design**: Playful Pop-Art x Futurism style with Banana Yellow + Neon Purple color scheme
- **Custom Font System**: Syne (display) + Outfit (body) + Space Mono (code)
- **Smooth Animations**: Framer Motion powered silky interactions and page transitions
- **Responsive Layout**: Perfect support for mobile, tablet, and desktop devices

### 🔍 Powerful Functionality
- **Real-time Search**: Quick search across titles and prompt content
- **Tag Filtering**: Filter cases by style, model, and other tags
- **Bilingual Support**: Chinese/English automatic switching with intelligent language detection
- **Detail Modal**: Click cards to view large images and complete prompts
- **One-click Copy**: Quickly copy prompts to clipboard

### ⚡ Performance Optimization
- **CDN Acceleration**: 1303+ images distributed globally via Cloudflare R2 CDN
- **Image Optimization**: Next.js Image component automatic optimization
- **Code Splitting**: On-demand loading for fast first-screen rendering
- **Data Caching**: Smart caching strategy

### 🚀 Developer Experience
- **TypeScript**: Type-safe with excellent development experience
- **Component-based**: Clear component structure and code organization
- **Incremental Upload**: R2 image incremental upload tool avoids duplicate uploads

## 🎯 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 15.5.9 | React framework, App Router |
| **React** | 19.0 | UI library |
| **TypeScript** | 5 | Type safety |
| **Tailwind CSS** | 3.4 | Styling framework |
| **Framer Motion** | 11.15 | Animation library |
| **AWS SDK** | 3.962 | R2 storage client |
| **Cloudflare R2** | - | Image CDN storage |

### Font System
- **Syne** (700, 800) - Headings and display text
- **Outfit** (300-700) - Body and UI text
- **Space Mono** (400, 700) - Code and prompts

## 📦 Installation & Usage

### Requirements

- Node.js 18+
- npm or yarn

### Quick Start

```bash
# 1. Clone repository
git clone https://github.com/gotoBest/banana-nano-prompt.git
cd banana-nano-prompt

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser
# http://localhost:3000
```

### Build Production Version

```bash
# Build
npm run build

# Start production server
npm run start
```

## 🚀 Deployment

### Vercel Deployment (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/gotoBest/banana-nano-prompt)

1. Click the button above
2. Import GitHub repository
3. Vercel auto-detects Next.js configuration
4. Click "Deploy"

### Environment Variables (Optional)

If you need to configure CDN or other features:

```env
# R2 CDN domain (images already configured as https://gotovpn.win)
NEXT_PUBLIC_R2_CDN_URL=https://your-cdn-domain.com
```

## 🎨 Design System

### Color Scheme
```css
--color-banana: #FFE135;      /* Banana Yellow */
--color-neon-pink: #FF6B9D;   /* Neon Pink */
--color-neon-purple: #B829DD; /* Neon Purple */
--color-bg-dark: #0F0E1E;     /* Dark Background */
--color-bg-card: #1A1033;     /* Card Background */
```

### Font Hierarchy
```css
--font-display: 'Syne', sans-serif;
--font-body: 'Outfit', sans-serif;
--font-mono: 'Space Mono', monospace;
```

### Component Features
- **Glass Card**: Frosted glass effect cards
- **Neon Glow**: Neon glowing borders
- **Skeleton Shimmer**: Loading screen animation
- **Hover Effects**: 3D tilt and zoom effects

## 📁 Project Structure

```
banana-nano-prompt/
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles and CSS variables
│   │   ├── layout.tsx           # Root layout (font loading)
│   │   └── page.tsx             # Main page
│   ├── components/
│   │   ├── Header.tsx           # Top navigation bar
│   │   ├── PromptCard.tsx       # Case card component
│   │   ├── Modal.tsx            # Detail modal
│   │   └── MetadataUpdater.tsx  # SEO metadata update
│   ├── contexts/
│   │   └── LanguageContext.tsx  # Language switch context
│   ├── data/
│   │   ├── prompts.json         # 1084 cases data
│   │   ├── title-en.json        # English translations
│   │   └── id-title.json        # ID-title mapping
│   ├── lib/
│   │   ├── data.ts              # Data loading
│   │   └── i18n.ts              # Internationalization
│   └── types/
│       └── index.ts             # TypeScript type definitions
├── public/
│   └── images/                  # Image folder (migrated to R2)
├── scripts/
│   ├── upload-images-to-r2.js  # R2 upload script
│   ├── update-image-urls-to-r2.js # URL update script
│   └── download-images.js      # Image download script
├── .env.local.example           # Environment variables template
├── next.config.js               # Next.js configuration
├── tailwind.config.ts           # Tailwind configuration
└── package.json
```

## 📊 Data Statistics

- **Total Cases**: 1084 AI prompt cases
- **Image Count**: 1303+ high-quality images
- **Storage**: Cloudflare R2 CDN
- **Data Size**: ~2MB (excluding images)
- **Supported Languages**: Chinese, English

## 🔧 R2 CDN Management

### Upload Images to R2

```bash
# First time or incremental upload
npm run r2:upload

# Update image URLs
NEXT_PUBLIC_R2_CDN_URL=https://your-cdn.com npm run r2:update-urls
```

### Features
- ✅ **Incremental Upload**: Automatically skips already uploaded files
- ✅ **Record Tracking**: r2-upload-record.json tracks upload history
- ✅ **R2 Sync**: Automatically syncs existing files from R2
- ✅ **Progress Display**: Real-time upload/skip progress

## 🌍 Internationalization

### Supported Languages
- 🇨🇳 Chinese (Simplified)
- 🇺🇸 English

### Auto Detection
- Automatically switches based on browser language
- Chinese users see Chinese by default
- Other languages default to English
- Manual switching takes effect immediately

## 🎯 Use Cases

- ✅ AI artists finding inspiration
- ✅ Prompt engineers reference and learning
- ✅ Designers exploring AI art styles
- ✅ Developers learning Next.js best practices

## 🛠️ Development Commands

```bash
# Development
npm run dev          # Start development server

# Build
npm run build        # Build production version
npm run start        # Start production server

# Image Management
npm run download-images      # Download images
npm run r2:upload            # Upload to R2
npm run r2:update-urls       # Update image URLs

# Code Check
npm run lint          # ESLint check
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 Changelog

### v1.0.0 (2026-01-06)
- ✅ Initial release
- ✅ 1084 AI prompt cases
- ✅ Bilingual support (Chinese/English)
- ✅ Responsive design
- ✅ R2 CDN integration
- ✅ Incremental upload functionality

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Cloudflare R2](https://www.cloudflare.com/products/r2/) - Object storage
- [Nano Banana](https://nano.banana/) - AI prompt source

---

**Made with 🍌 by [gotoBest](https://github.com/gotoBest)**

⭐ If this project helps you, please give it a Star!

📧 Questions or suggestions? Welcome to submit [Issue](https://github.com/gotoBest/banana-nano-prompt/issues)
